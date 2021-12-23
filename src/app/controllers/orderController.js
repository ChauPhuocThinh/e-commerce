const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mongooseToObject } = require('../../util/mongoose');

class OrderController {
    //[GET] //orders/:id/view
    view(req, res, next) {
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content)=>{
                Order.findById(req.params.id)
                    .then((order) => {
                        if (req.session.successSignin == 'Admin' ||
                        req.session.successSignin == 'Mod' ||
                        req.session.successSignin == 'Salesman'){
                            User.findOne({ email: req.session.email })
                                .then((user) =>{
                                    res.render('orders/view', { 
                                        user: mongooseToObject(user),
                                        order: mongooseToObject(order),
                                        content: mongooseToObject(content)
                                    });
                                })
                                .catch(next)
                        } else{
                            res.redirect('/users/signin');
                        }
                        
                    })
                    .catch(next);
            })
            .catch(next)
        
    }
    //[PUT] /orders/:id
    update(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/orders'))
            .catch(next);
    }

    //[DELETE] //orders/:id/
    delete(req, res, next) {
        Order.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[POST] //orders/deleteMany
    deleteMany(req, res, next) {
        Order.delete({ _id: {$in: req.body.orderIds}})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] //orders/:id/force
    deleteForce(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] //orders/:id/restore
    restore(req, res, next) {
        Order.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] //orders/restoreMany
    restoreMany(req, res, next) {
        Order.restore({ _id: {$in: req.body.orderIds}})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    
}
module.exports = new OrderController();
