const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
class SiteController {
    //[GET] /home
    index(req, res, next) {
        function sortItems(itemQuery) {
            if (req.query.hasOwnProperty('_sort')) {
                itemQuery = itemQuery.sort({
                    [req.query.column]: req.query.typeSort,
                });
            }
        }
        // const filter = {}
        // for (var key in req.query) {
        //     filter[key] = req.query[key];
        // }
        // delete filter._filter
        // delete filter._sort
        // delete filter.column
        // delete filter.typeSort
        // const itemQuery = Item.find(filter)
        // sortItems(itemQuery)
        // itemQuery
        //     .then((items)=>{
        //         res.render('home',{
        //             items: mutipleMongooseToObject(items),
        //         })
        //     })
        //     .catch(next)
        if (!req.query.hasOwnProperty('_filter')) {
            let itemQuery = Item.find({});
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        } else if (
            req.query.priceRange &&
            req.query.type &&
            req.query.brand &&
            req.query.hasOwnProperty('_filter')
        ) {
            let itemQuery = Item.find({
                priceRange: req.query.priceRange,
                type: req.query.type,
                brand: req.query.brand,
            });
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        } else if (
            req.query.brand &&
            req.query.priceRange &&
            req.query.hasOwnProperty('_filter')
        ) {
            let itemQuery = Item.find({
                brand: req.query.brand,
                priceRange: req.query.priceRange,
            });
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        } else if (
            req.query.brand &&
            req.query.type &&
            req.query.hasOwnProperty('_filter')
        ) {
            let itemQuery = Item.find({
                brand: req.query.brand,
                type: req.query.type,
            });
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        } else if (
            req.query.type &&
            req.query.priceRange &&
            req.query.hasOwnProperty('_filter')
        ) {
            let itemQuery = Item.find({
                type: req.query.type,
                priceRange: req.query.priceRange,
            });
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        } else if (req.query.type && req.query.hasOwnProperty('_filter')) {
            let itemQuery = Item.find({
                type: req.query.type,
            });
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        } else if (req.query.brand && req.query.hasOwnProperty('_filter')) {
            let itemQuery = Item.find({
                brand: req.query.brand,
            });
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        } else if (
            req.query.priceRange &&
            req.query.hasOwnProperty('_filter')
        ) {
            let itemQuery = Item.find({
                priceRange: req.query.priceRange,
            });
            sortItems(itemQuery);
            itemQuery
                .then((items) => {
                    res.render('home', {
                        items: mutipleMongooseToObject(items),
                    });
                })
                .catch(next);
        }

        //res.render('home');
    }
    //[GET] /searchOrder
    searchOrder(req, res, next) {
        if (req.query.search) {
            Order.findOne({ _id: parseFloat(req.query.search) })
                .then((order) => {
                    res.render('searchOrder', {
                        id: req.query.search,
                        order: mongooseToObject(order),
                    });
                })
                .catch(next);
        } else {
            res.render('searchOrder');
        }
    }

    //[POST] /orderitems
    orderHandle(req, res, next) {
        const order = new Order(req.body);
        order.save();
        res.render('orderitems', {
            orderId: req.body._id,
        });
    }
    //[GET] /aboutus
    aboutUs(req, res, next) {
        res.render('aboutus');
    }
    //[GET] /helps
    helps(req, res, next) {
        res.render('helps');
    }
    //[GET] /policies
    policies(req, res, next) {
        res.render('policies');
    }
    //[GET] /searchItems
    searchItems(req, res, next) {
        Item.find({'name': {'$regex': req.query.key, '$options': 'i'}})
            .then((items)=> {
                res.render('searchItems',{
                    items: mutipleMongooseToObject(items),
                    key: req.query.key
                })
            })
    }
}
module.exports = new SiteController();
