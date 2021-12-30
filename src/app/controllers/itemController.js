const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mongooseToObject } = require('../../util/mongoose');
const fs = require('fs')
class ItemController {
    //[GET] /items/:slug
    show(req, res, next) {
        Item.findOne({ slug: req.params.slug })
            .then((item) => {
                res.render('items/show', {
                    item: mongooseToObject(item),
                });
            })
            .catch(next);
    }
    //[GET] //items/create
    create(req, res, next) {
        if (
            req.session.successSignin == 'Admin' ||
            req.session.successSignin == 'Mod'
        ) {
            res.render('items/create');
        } else {
            res.send('Trang này chỉ dành cho Admin và Mod');
        }
    }
    //[POST] /items/store
    createHandle(req, res, next) {
        req.body.image = "/" + req.file.path
        const item = new Item(req.body);
        item.save();
        res.redirect('/me/stored/items');
    }
    //[GET] //items/:id/edit
    edit(req, res, next) {
        if (req.query.hasOwnProperty('_delete')){
            const path = req.query.name.replace('./uploads\\','./uploads/')
            fs.unlinkSync(path)
        }
        Item.findById(req.params.id)
            .then((item) => {
                if (
                    req.session.successSignin == 'Admin' ||
                    req.session.successSignin == 'Mod'
                ) {
                    res.render('items/edit', {
                        item: mongooseToObject(item),
                    });
                } else {
                    res.send('Trang này chỉ dành cho Admin hoặc Mod');
                }
            })
            .catch(next);
    }

    //[PUT] //items/:id/
    update(req, res, next) {
        if (typeof req.file !== 'undefined'){
            req.body.image = "/" + req.file.path
        }
        Item.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/items'))
            .catch(next);
    }

    //[DELETE] //items/:id/
    delete(req, res, next) {
        Item.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] //items/:id/force
    deleteForce(req, res, next) {
        Item.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] //items/:id/restore
    restore(req, res, next) {
        Item.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[POST] //orderitems
    orderHandle(req, res, next) {
        const order = new Order(req.body);
        order.save();
        res.render('orderitems');
    }
    //[POST] /items/deleteMany
    deleteMany(req, res, next) {
        Item.delete({ _id: { $in: req.body.itemIds } })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] //items/restoreMany
    restoreMany(req, res, next) {
        Item.restore({ _id: { $in: req.body.itemIds } })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}
module.exports = new ItemController();
