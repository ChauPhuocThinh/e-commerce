const Content = require('../models/content');
module.exports = async function contentMiddleware(req, res, next) {
    const contentDB = await Content.findOne({
        _id: '61b06b214abfb32e201c3d95',
    });
    if (contentDB) {
        res.locals.content = {
            shopName: contentDB.shopName,
            aboutusContent: contentDB.aboutusContent,
            helpsContent: contentDB.helpsContent,
            policiesContent: contentDB.policiesContent,
            hotLine: contentDB.hotLine,
            store: contentDB.store,
            email: contentDB.email,
            poster1: contentDB.poster1,
            poster2: contentDB.poster2,
            poster3: contentDB.poster3,
            poster4: contentDB.poster4,
            colorBackground: contentDB.colorBackground,
            colorNavbar: contentDB.colorNavbar,
            colorForm: contentDB.colorForm,
            bodyBackground: contentDB.bodyBackground,
            linkFB: contentDB.linkFB,
            linkInsta: contentDB.linkInsta,
            linkTW: contentDB.linkTW,
            createdAt: contentDB.createdAt,
            updateAt: contentDB.updateAt,
        };
    } else {
        res.send('err');
    }

    next();
};
