const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const bcrypt = require("bcrypt");
const { mongooseToObject } = require('../../util/mongoose');
const { findOne } = require('../models/item');
class UserController {
    //[GET] /users/sign-up
    signUp(req, res, next) {
      if(req.session.successSignin == 'Admin'){
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
              User.findOne({email: req.session.email})
                .then((user)=>{
                  res.render('users/signup', {
                    content: mongooseToObject(content),
                    user: mongooseToObject(user)
                  });
                })
                .catch(next)
              })
              .catch(next)
      }else{
        res.send('Trang này chỉ dành cho Admin')
      }
              
        
    }
    //[POST] /users/sign-up
    async signUpHandle(req, res, next){
        try {
            const saltRounds = 10;
            const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
            const user = await User.findOne({ID: req.body.ID})
            if (user){
              res.send('Số Căn Cước Công Dân/ CMND đã được đăng ký')
            }else{
              const insertResult = await User.create({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hashedPwd,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                ID: req.body.ID,
                dateofBirth: req.body.dateofBirth,
                role: req.body.role,
                avatar: req.body.avatar
              });
              res.redirect('/me/accounts')
            }
            
          } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server error Occured");
          }

    }
    //[GET] /users/sign-in
    signIn(req, res, next) {
      Content.findOne({})
      .then((content)=>{
        if (req.session.successSignin == 'Admin' ||
        req.session.successSignin == 'Mod' ||
        req.session.successSignin == 'Salesman') {
          res.redirect('/me')
        }
        else {      
          res.render('users/signin',{
            content: mongooseToObject(content)
          })
        }
      })
      .catch(next)
    }
    //[GET] /users
    user(req, res, next){
      Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
              if (req.session.successSignin == 'Admin' ||
              req.session.successSignin == 'Mod' ||
              req.session.successSignin == 'Salesman') {
                User.findOne({ email: req.session.email })
                .then((user) => {
                    res.render('users/users', 
                    { user: mongooseToObject(user),
                      content: mongooseToObject(content) });
                })
                .catch(next);
            }
            else {      
                req.session.back="users/users"; 
                res.redirect('/users/signin')
            }
            })
            .catch(next)
        
    }
    //[POST] /users/signin
    async signInHandle(req, res, next){
        try {
            const user = await User.findOne({ email: req.body.email });
            console.log(user);
            if (user) {
              const cmp = await bcrypt.compare(req.body.password, user.password);
              if (cmp) {
                //   ..... further code to maintain authentication like jwt or sessions
                
                var sess = req.session;  //initialize session variable
                sess.successSignin = user.role;
                sess.email = user.email;
                res.redirect('/users')
                if (sess.back){ 
                  console.log(sess.back);
                  res.redirect(sess.back);
                }
                else {
                    res.redirect("/users");
                }

              } else {
                res.send("Wrong username or password.");
              }
            } else {
              res.send("Wrong username or password.");
            }
          } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server error Occured");
          }
        }
    //[GET] signout
    signOut(req, res, next){
      req.session.destroy();
      res.redirect("signin");
    }
    //[GET] /me/accounts/:id
    edit(req, res, next) {
      if (req.session.successSignin == 'Admin') {
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
              User.findOne({email: req.session.email})
                .then((user) => {
                  User.findById({ _id: req.params.id})
                    .then((account)=>{
                      res.render('./users/user', {
                        account: mongooseToObject(account),
                        user: mongooseToObject(user),
                        content: mongooseToObject(content)
                      })
                    })
                })
                .catch(next)
            })
            .catch(next)
        
      }else{
        res.send('Trang này chỉ dành cho Admin')
      }
      
      }
    //[PUT] /me/accounts/:id    
    async update(req,res, next){
      const saltRounds = 10;
      const hashedPwd = await bcrypt.hash(req.body.newPass, saltRounds);
      if (req.body.newPass == ''){
        const update = await User.updateOne({ _id: req.params.id}, {
          role: req.body.role,
        })
          .then(() => res.redirect('/me/accounts'))
          .catch(next)
      } else{
        const user = await User.findOne( {_id: req.params.id})
        const check = await bcrypt.compare(req.body.oldPass, user.password )
          if (check){
            const update = await User.updateOne({ _id: req.params.id}, {
              role: req.body.role,
              password: hashedPwd
              })
              .then(() => res.redirect('/me/accounts'))
              .catch(next)
          }else{
            res.send('Mật khẩu cũ không đúng!')
          }
      }
  }
}

module.exports = new UserController();