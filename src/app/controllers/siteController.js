const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /home
    index(req, res, next) {
            function sortItems(itemQuery){
                if (req.query.hasOwnProperty('_sort')){
                    itemQuery = itemQuery.sort({
                        [req.query.column]: req.query.typeSort
                    })
                }
            }
            Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
                .then((content)=>{
                    if( !req.query.hasOwnProperty('_filter') ){
                        let itemQuery = Item.find({})
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    else if(req.query.priceRange && req.query.type && req.query.brand && req.query.hasOwnProperty('_filter')){
                        let itemQuery = Item.find({
                            priceRange: req.query.priceRange,
                            type: req.query.type,
                            brand: req.query.brand
                        })
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    else if(req.query.brand && req.query.priceRange && req.query.hasOwnProperty('_filter')){
                        let itemQuery = Item.find({
                            brand: req.query.brand,
                            priceRange: req.query.priceRange
                        })
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    else if(req.query.brand && req.query.type && req.query.hasOwnProperty('_filter')){
                        let itemQuery = Item.find({
                            brand: req.query.brand,
                            type: req.query.type
                        })
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    else if(req.query.type && req.query.priceRange && req.query.hasOwnProperty('_filter')){
                        let itemQuery = Item.find({
                            type: req.query.type,
                            priceRange: req.query.priceRange
                        })
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    else if(req.query.type && req.query.hasOwnProperty('_filter')){
                        let itemQuery = Item.find({
                            type: req.query.type
                        })
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    else if(req.query.brand && req.query.hasOwnProperty('_filter')){
                        let itemQuery = Item.find({
                            brand: req.query.brand
                        })
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    else if(req.query.priceRange && req.query.hasOwnProperty('_filter')){
                        let itemQuery = Item.find({
                            priceRange: req.query.priceRange
                        })
                        sortItems(itemQuery)
                        itemQuery
                            .then((items) => {
                                if (req.session.successSignin == 'Admin' ||
                                req.session.successSignin == 'Mod' ||
                                req.session.successSignin == 'Salesman'){
                                    User.findOne({ email: req.session.email })
                                        .then((user) => {
                                            res.render('home', {
                                                items: mutipleMongooseToObject(items),
                                                user: mongooseToObject(user),
                                                content: mongooseToObject(content)})
                                        })
                                        .catch(next);
                                }
                                else{
                                    res.render('home', {
                                        items: mutipleMongooseToObject(items),
                                        content: mongooseToObject(content)
                                    });
                                }
                                
                            })
                            .catch(next);
                    }
                    
                    
                })
                .catch(next)
            
        //res.render('home');
    }
    //[GET] /search
    searchOrder(req, res, next) {
        Content.findOne({_id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                if(req.query.search){
                    Order.findOne({_id: parseFloat(req.query.search)})
                        .then((order) => {
                            if (req.session.successSignin == 'Admin' ||
                            req.session.successSignin == 'Mod' ||
                            req.session.successSignin == 'Salesman'){
                                User.findOne({ email: req.session.email })
                                    .then((user) => {
                                        res.render('searchOrder', {
                                            order: mongooseToObject(order),
                                            user: mongooseToObject(user),
                                            content: mongooseToObject(content)})
                                    })
                                    .catch(next);
                            }
                            else{
                                res.render('searchOrder', {
                                    order: mongooseToObject(order),
                                    content: mongooseToObject(content)
                                });
                            }
                            
                        })
                        .catch(next);
                }else{
                    if (req.session.successSignin == 'Admin' ||
                        req.session.successSignin == 'Mod' ||
                        req.session.successSignin == 'Salesman'){
                            User.findOne({ email: req.session.email })
                                .then((user) => {
                                    res.render('searchOrder', {
                                        user: mongooseToObject(user),
                                        content: mongooseToObject(content)})
                                })
                                .catch(next);
                            }
                            else{
                                res.render('searchOrder', {
                                    content: mongooseToObject(content)
                                });
                            }
                }
            })
            .catch(next)
    }


    //[POST] /orderitems
    orderHandle(req, res, next) {
        const order = new Order(req.body);
        order.save();
        res.render('orderitems',{
            orderId: req.body._id
        });
    }


    aboutUs(req, res, next) {
        Content.findOne({_id: '61b06b214abfb32e201c3d95'})
            .then((content) => {
                if (req.session.successSignin == 'Admin' ||
                req.session.successSignin == 'Mod' ||
                req.session.successSignin == 'Salesman'){
                    User.findOne({ email: req.session.email })
                        .then((user) => {
                            res.render('aboutus', {
                                content: mongooseToObject(content),
                                user: mongooseToObject(user),})
                        })
                        .catch(next);
                }
                else{
                    res.render('aboutus', {
                        content: mongooseToObject(content),
                    });
                }
                
            })
            .catch(next);
    }




}
module.exports = new SiteController();
