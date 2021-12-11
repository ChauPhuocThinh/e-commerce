const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /home
    index(req, res, next) {
            Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
                .then((content)=>{
                    if(Object.keys(req.query).length === 0){
                        Item.find({})
                    
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
                    else if(req.query.priceRange && req.query.type && req.query.brand){
                        Item.find({
                            priceRange: req.query.priceRange,
                            type: req.query.type,
                            brand: req.query.brand
                        })
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
                    else if(req.query.brand && req.query.priceRange){
                        Item.find({
                            brand: req.query.brand,
                            priceRange: req.query.priceRange
                        })
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
                    else if(req.query.brand && req.query.type){
                        Item.find({
                            brand: req.query.brand,
                            type: req.query.type
                        })
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
                    else if(req.query.type && req.query.priceRange){
                        Item.find({
                            type: req.query.type,
                            priceRange: req.query.priceRange
                        })
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
                    else if(req.query.type){
                        Item.find({
                            type: req.query.type
                        })
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
                    else if(req.query.brand){
                        Item.find({
                            brand: req.query.brand
                        })
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
                    else if(req.query.priceRange){
                        Item.find({
                            priceRange: req.query.priceRange
                        })
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
    search(req, res, next) {
        Item.find({
            brand: req.query.brand,
            //priceRange: req.query.priceRange,
            //type: req.query.type,
            // RAM: req.query.RAM,
            // ROM: req.query.ROM
        })
            .then((items) => {
                console.log(req.query.brand)
                res.render('search', {
                    items: mutipleMongooseToObject(items),
                });
            })
            .catch(next);
    }

    //[POST] /orderitems
    orderHandle(req, res, next) {
        const order = new Order(req.body);
        order.save();
        res.render('orderitems');
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
