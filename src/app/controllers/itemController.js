const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mongooseToObject } = require('../../util/mongoose');
class ItemController {
    //[GET] /items/:slug
    show(req, res, next) {
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                Item.findOne({ slug: req.params.slug })
                    .then((item) => {
                        if (req.session.successSignin == 'Admin' ||
                        req.session.successSignin == 'Mod' ||
                        req.session.successSignin == 'Salesman'){
                            User.findOne({ email: req.session.email })
                                .then((user) =>{
                                    res.render('items/show', { 
                                        item: mongooseToObject(item),
                                        user: mongooseToObject(user),
                                        content: mongooseToObject(content)
                                    });
                                })
                                .catch(next)
                        } else{
                            res.render('items/show', { 
                                item: mongooseToObject(item),
                                content: mongooseToObject(content) });
                        }
                        
                    })
                    .catch(next);
            })
            .catch(next)
        
    }
    //[GET] //items/create
    create(req, res, next) {
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                if (req.session.successSignin == 'Admin' ||
                req.session.successSignin == 'Mod'){
                    User.findOne({ email: req.session.email })
                        .then((user) =>{
                            res.render('items/create', {
                                user: mongooseToObject(user),
                                content: mongooseToObject(content)
                            });
                        })
                        .catch(next)
                } else{
                    res.send('Trang này chỉ dành cho Admin và Mod')
                }
                })
            .catch(next)
        
    }
    //[POST] /items/store
    createHandle(req, res, next) {
        const formData = req.body;
        const item = new Item(formData);
        item.save();
        res.redirect('/me/stored/items');
    }
    //[GET] //items/:id/edit
    edit(req, res, next) {
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                Item.findById(req.params.id)
                    .then((item) => {
                        if (req.session.successSignin == 'Admin' ||
                        req.session.successSignin == 'Mod'){
                            User.findOne({ email: req.session.email })
                                .then((user) =>{
                                    res.render('items/edit', { 
                                        item: mongooseToObject(item),
                                        user: mongooseToObject(user),
                                        content: mongooseToObject(content)
                                    });
                                })
                                .catch(next)
                        } else{
                            res.send('Trang này chỉ dành cho Admin hoặc Mod')
                        }
                        
                    })
                    .catch(next);
            })
            .catch(next)
        
    }
   
    //[PUT] //items/:id/
    update(req, res, next) {
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
    deleteMany(req, res, next){
       Item.delete({ _id: { $in: req.body.itemIds}})
       .then(() => res.redirect('back'))
       .catch(next);
    }
    //[PATCH] //items/restoreMany
    restoreMany(req, res, next) {
        Item.restore({ _id: {$in: req.body.itemIds}})
            .then(() => res.redirect('back'))
            .catch(next);
    } 
}
module.exports = new ItemController();
