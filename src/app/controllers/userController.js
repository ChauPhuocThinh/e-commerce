const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const bcrypt = require('bcryptjs');
const { mongooseToObject } = require('../../util/mongoose');
const { findOne } = require('../models/item');
class UserController {
    //[GET] /users/sign-up
    signUp(req, res, next) {
        if (req.session.successSignin == 'Admin') {
            res.render('users/signup');
        } else {
            res.send('Trang này chỉ dành cho Admin');
        }
    }
    //[POST] /users/sign-up
    async signUpHandle(req, res, next) {
        try {
            const saltRounds = 10;
            const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
            const user = await User.findOne({ ID: req.body.ID });
            if (user) {
                res.send('Số Căn Cước Công Dân/ CMND đã được đăng ký');
            } else {
                const insertResult = await User.create({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hashedPwd,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    ID: req.body.ID,
                    dateofBirth: req.body.dateofBirth,
                    role: req.body.role,
                    avatar: "/" + req.file.path,
                });
                res.redirect('/me/accounts');
            }
        } catch (error) {
            res.status(500).send('Internal Server error Occured');
        }
    }
    //[GET] /users/sign-in
    signIn(req, res, next) {
        if (
            req.session.successSignin == 'Admin' ||
            req.session.successSignin == 'Mod' ||
            req.session.successSignin == 'Salesman'
        ) {
            res.redirect('/me');
        } else {
            res.render('users/signin');
        }
    }
    //[GET] /users
    user(req, res, next) {
        if (
            req.session.successSignin == 'Admin' ||
            req.session.successSignin == 'Mod' ||
            req.session.successSignin == 'Salesman'
        ) {
            res.render('users/users');
        } else {
            req.session.back = 'users/users';
            res.redirect('/users/signin');
        }
    }
    //[POST] /users/signin
    async signInHandle(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const cmp = await bcrypt.compare(
                    req.body.password,
                    user.password,
                );
                if (cmp) {
                    //   ..... further code to maintain authentication like jwt or sessions

                    var sess = req.session; //initialize session variable
                    sess.successSignin = user.role;
                    sess.email = user.email;
                    res.redirect('/users');
                    if (sess.back) {
                        console.log(sess.back);
                        res.redirect(sess.back);
                    } else {
                        res.redirect('/users');
                    }
                } else {
                    res.send('Bạn đã nhập sai email hoặc mật khẩu.');
                }
            } else {
                res.send('Bạn đã nhập sai email hoặc mật khẩu.');
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal Server error Occured');
        }
    }
    //[GET] signout
    signOut(req, res, next) {
        req.session.destroy();
        res.redirect('signin');
    }
    //[GET] /me/accounts/:id
    edit(req, res, next) {
        if (req.session.successSignin == 'Admin') {
            User.findById({ _id: req.params.id }).then((account) => {
                res.render('./users/user', {
                    account: mongooseToObject(account),
                });
            });
        } else {
            res.send('Trang này chỉ dành cho Admin');
        }
    }
    //[PUT] /me/accounts/:id
    async update(req, res, next) {
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(req.body.newPass, saltRounds);
        if (req.body.newPass == '') {
            const update = await User.updateOne(
                { _id: req.params.id },
                req.body
            )
                .then(() => res.redirect('/me/accounts'))
                .catch(next);
        } else {
            const update = await User.updateOne(
                { _id: req.params.id },
                {
                    fullName: req.body.fullName,
                    email: req.body.email,
                    ID: req.body.ID,
                    avatar: req.body.avatar,
                    dateofBirth: req.body.dateofBirth,
                    address: req.body.address,
                    role: req.body.role,
                    password: hashedPwd,
                },
            )
                    .then(() => res.redirect('/me/accounts'))
                    .catch(next);
        }
    }
}

module.exports = new UserController();
