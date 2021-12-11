const Item = require('../models/item');
const Order = require('../models/order');
const User = require('../models/user');
const Content = require('../models/content');
const { mongooseToObject } = require('../../util/mongoose');
class ContentController {
    //[GET] /content/view
    view(req,res,next){
        Content.findOne({ _id: '61b06b214abfb32e201c3d95'})
            .then((content) => {
                if (req.session.successSignin == 'Admin' ||
                req.session.successSignin == 'Mod'){
                    User.findOne({ email: req.session.email })
                        .then((user) => {
                            res.render('./content/view', {
                                user: mongooseToObject(user),
                                content: mongooseToObject(content)})
                        })
                        .catch(next);
                }
                else{
                    
                    res.send('Trang này chỉ dành cho Admin hoặc Mod')
                }
                
            })
            .catch(next);
    }
    //[PUT] /content/view
    update(req,res,next){
        Content.updateOne({ _id: '61b06b214abfb32e201c3d95' }, req.body)
            .then(() => res.redirect('view'))
            .catch(next);
    }
    
}
module.exports = new ContentController();
