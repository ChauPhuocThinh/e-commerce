const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const bcrypt = require("bcrypt");
class MeController {
    //[GET] /me/stored/items

    stored(req, res, next) {
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                Item.find({})
                    .then((items) =>{
                        if (req.session.successSignin == 'Admin' ||
                        req.session.successSignin == 'Mod'){
                            User.findOne({ email: req.session.email })
                                .then((user) =>{
                                    res.render('./me/stored', {
                                        items: mutipleMongooseToObject(items),
                                        user: mongooseToObject(user),
                                        content: mongooseToObject(content)
                                    })
                                })
                                .catch(next)
                            } else {
                                res.send('Trang ngày chỉ dành cho Admin hoặc Mod')
                            }
                    })
                    .catch(next);
                    })
            .catch(next)
        
    }
    //[GET] /me/orders
    orders(req, res, next) {
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                Order.find({})
                    .then((orders) =>{
                        if (req.session.successSignin == 'Admin' ||
                        req.session.successSignin == 'Mod' ||
                        req.session.successSignin == 'Salesman'){
                            User.findOne({ email: req.session.email })
                                .then((user) =>{
                                    res.render('./me/orders', {
                                        orders: mutipleMongooseToObject(orders),
                                        user: mongooseToObject(user),
                                        content: mongooseToObject(content)
                                    })
                                })
                                .catch(next)
                            } else {
                                res.redirect('/users/signin');
                            }
                    })
                    .catch(next);
                    })
            .catch(next)
    }
    //[GET] /me/accounts
    accounts(req,res,next){
        if(req.session.successSignin == 'Admin'){
            Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
                .then((content)=>{
                    User.find({})
                        .then((users)=>{
                            User.findOne({email: req.session.email})
                                .then((user) => {
                                    res.render('./me/accounts', {
                                        users: mutipleMongooseToObject(users),
                                        user: mongooseToObject(user),
                                        content: mongooseToObject(content)
                                    })
                                })
                                .catch(next)
                            
                        })
                        .catch(next)
                        })
                .catch(next)
        }else{
            res.send('Trang này chỉ dành cho Admin')
        }
        
        
    }
    //[GET] /me
    me(req, res, next){
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                User.find({})
                    .then((user) => {
                        if (req.session.successSignin == 'Admin' ||
                        req.session.successSignin == 'Mod' ||
                        req.session.successSignin == 'Salesman'){
                            User.findOne({ email: req.session.email })
                                .then((user) => {
                                    res.render('./me/me', {
                                        user: mongooseToObject(user),
                                        content: mongooseToObject(content)})
                                })
                                .catch(next);
                        }
                        else{
                            
                            res.redirect('/users/signin');
                        }
                        
                    })
                    .catch(next);
                    })
            .catch(next)
        
    }
    //[GET] /me/edit
    edit(req, res, next){
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                User.findOne({ email: req.session.email })
                    .then((user) =>{
                        res.render('./me/edit', {
                            user: mongooseToObject(user),
                            content: mongooseToObject(content)
                        });
                    })
                    .catch(next)
                    })
            .catch(next)
        
    }
    //[PUT] /me
    async update(req,res, next){
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(req.body.newPass, saltRounds);
        if (req.body.newPass == ''){
            const update = await User.updateOne({email: req.session.email}, {
                fullName: req.body.fullName,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
            })
                .then(() => res.redirect('./me'))
                .catch(next)
        } else {
            const user = await User.findOne({email: req.session.email})
            const check = await bcrypt.compare(req.body.oldPass, user.password )
            if (check){
                const update = await User.updateOne({email: req.session.email}, {
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    password: hashedPwd
                })
                    .then(() => res.redirect('./me'))
                    .catch(next)
            }else{
                res.send('Mật khẩu cũ không đúng')
            }
            
        }
    }
    //[DELETE] /me/accounts/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


    
}
module.exports = new MeController();
