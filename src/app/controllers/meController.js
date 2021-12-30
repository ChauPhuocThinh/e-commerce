const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs')
class MeController {
    //[GET] /me/stored/items

    stored(req, res, next) {
        let itemQuery = Item.find({});
        if (req.query.hasOwnProperty('_sort')) {
            itemQuery = itemQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        itemQuery
            .then((items) => {
                if (
                    req.session.successSignin == 'Admin' ||
                    req.session.successSignin == 'Mod'
                ) {
                    res.render('./me/stored', {
                        items: mutipleMongooseToObject(items),
                    });
                } else {
                    res.send('Trang ngày chỉ dành cho Admin hoặc Mod');
                }
            })
            .catch(next);
    }
    //[GET] /me/orders
    orders(req, res, next) {
        let orderQuery = Order.find({});
        if (req.query.hasOwnProperty('_sort')) {
            orderQuery = orderQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        orderQuery
            .then((orders) => {
                if (
                    req.session.successSignin == 'Admin' ||
                    req.session.successSignin == 'Mod' ||
                    req.session.successSignin == 'Salesman'
                ) {
                    res.render('./me/orders', {
                        orders: mutipleMongooseToObject(orders),
                    });
                } else {
                    res.redirect('/users/signin');
                }
            })
            .catch(next);
    }
    //[GET] /me/accounts
    accounts(req, res, next) {
        let userQuery = User.find({ display: true });
        if (req.query.hasOwnProperty('_sort')) {
            userQuery = userQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        if (req.session.successSignin == 'Admin') {
            userQuery
                .then((users) => {
                    res.render('./me/accounts', {
                        users: mutipleMongooseToObject(users),
                    });
                })
                .catch(next);
        } else {
            res.send('Trang này chỉ dành cho Admin');
        }
    }
    //[GET] /me
    me(req, res, next) {
        User.find({})
            .then((user) => {
                if (
                    req.session.successSignin == 'Admin' ||
                    req.session.successSignin == 'Mod' ||
                    req.session.successSignin == 'Salesman'
                ) {
                    res.render('./me/me');
                } else {
                    res.redirect('/users/signin');
                }
            })
            .catch(next);
    }
    //[GET] /me/edit
    edit(req, res, next) {
        if (req.query.hasOwnProperty('_delete')){
            const path = req.query.name.replace('./uploads\\','./uploads/')
            fs.unlinkSync(path)
        }
        res.render('./me/edit');
    }
    //[PUT] /me
    async update(req, res, next) {
        const saltRounds = 10;
        const hashedPwd = await bcrypt.hash(req.body.newPass, saltRounds);
        if (req.body.newPass == '') {
            if (typeof req.file !== 'undefined'){
                req.body.avatar = "/" + req.file.path
            }
            const update = await User.updateOne(
                { email: req.session.email },
                {
                    fullName: req.body.fullName,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    avatar: req.body.avatar
                },
            )
                .then(() => res.redirect('./me'))
                .catch(next);
        } else {
            const user = await User.findOne({ email: req.session.email });
            const check = await bcrypt.compare(req.body.oldPass, user.password);
            if (check) {
                if (typeof req.file !== 'undefined'){
                    req.body.avatar = "/" + req.file.path
                }
                const update = await User.updateOne(
                    { email: req.session.email },
                    {
                        fullName: req.body.fullName,
                        phoneNumber: req.body.phoneNumber,
                        address: req.body.address,
                        password: hashedPwd,
                        avatar: req.body.avatar
                    },
                )
                    .then(() => res.redirect('./me'))
                    .catch(next);
            } else {
                res.send('Mật khẩu cũ không đúng');
            }
        }
    }
    //[DELETE] /me/accounts/:id
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[GET] /me/trash/items

    trashItems(req, res, next) {
        let trashItemsQuery = Item.findDeleted({});
        if (req.query.hasOwnProperty('_sort')) {
            trashItemsQuery = trashItemsQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        trashItemsQuery
            .then((items) => {
                if (
                    req.session.successSignin == 'Admin' ||
                    req.session.successSignin == 'Mod'
                ) {
                    res.render('./me/trashItems', {
                        items: mutipleMongooseToObject(items),
                    });
                } else {
                    res.send('Trang ngày chỉ dành cho Admin hoặc Mod');
                }
            })
            .catch(next);
    }
    //[GET] /me/trash/Orders

    trashOrders(req, res, next) {
        let trashOrdersQuery = Order.findDeleted({});
        if (req.query.hasOwnProperty('_sort')) {
            trashOrdersQuery = trashOrdersQuery.sort({
                [req.query.column]: req.query.type,
            });
        }
        trashOrdersQuery
            .then((orders) => {
                if (
                    req.session.successSignin == 'Admin' ||
                    req.session.successSignin == 'Mod'
                ) {
                    res.render('./me/trashOrders', {
                        orders: mutipleMongooseToObject(orders),
                    });
                } else {
                    res.send('Trang ngày chỉ dành cho Admin hoặc Mod');
                }
            })
            .catch(next);
    }
}
module.exports = new MeController();
