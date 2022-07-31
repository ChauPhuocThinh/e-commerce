const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Content = new Schema({
    shopName: { type: String, required: true },
    poster1: { type: String, maxLength: 1000 },
    poster2: { type: String },
    poster3: { type: String, maxLength: 255 },
    poster4: { type: String, maxLength: 255 },
    colorBackground: { type: String, maxLength: 255 },
    colorNavbar: { type: String, maxLength: 255 },
    colorForm: { type: String, maxLength: 255 },
    bodyBackground:{ type: String, maxLength: 255 },
    aboutusContent: { type: String },
    helpsContent: { type: String },
    policiesContent: { type: String },
    hotLine: { type: String },
    store: { type: String },
    email: { type: String },
    linkFB: { type: String, maxLength: 255 },
    linkInsta: { type: String, maxLength: 255 },
    linkTW: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Content', Content);
