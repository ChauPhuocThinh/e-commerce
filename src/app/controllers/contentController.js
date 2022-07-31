const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mongooseToObject } = require('../../util/mongoose');
const fs = require('fs')
class ContentController {
    //[GET] /content/view
    view(req, res, next) {
        if (
            req.session.successSignin == 'Admin' ||
            req.session.successSignin == 'Mod'
        ) {
            if (req.query.hasOwnProperty('_delete')){
                const path = req.query.name.replace('./uploads\\','./uploads/')
                fs.unlinkSync(path)
            }
            res.render('./content/view');
        } else {
            res.send('Trang này chỉ dành cho Admin hoặc Mod');
        }
    }
    //[PUT] /content/view
    update(req, res, next) {
        if (typeof req.files.poster123 !== 'undefined'){
            req.body.poster1 = "/" + req.files.poster123[0].path
            if (typeof req.files.poster123[1] !== 'undefined'){
                req.body.poster2 = "/" + req.files.poster123[1].path
                if (typeof req.files.poster123[2] !== 'undefined'){
                    req.body.poster3 =  "/" + req.files.poster123[2].path
                }
            }     
        }
        if (typeof req.files.poster4 !== 'undefined'){
            req.body.poster4 =  "/" + req.files.poster4[0].path
        }
        Content.updateOne({ _id: '61b06b214abfb32e201c3d95' }, req.body)
            .then(() => res.redirect('view'))
            .catch(next);
    }
}
module.exports = new ContentController();
