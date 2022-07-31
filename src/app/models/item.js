const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseDelete = require('mongoose-delete');

const Item = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxLength: 1000 },
    detail: { type: String },
    image: { type: String, maxLength: 255 },
    posterImg: { type: String, maxLength: 255 },
    price: { type: Number, maxLength: 255 },
    priceDel: { type: Number, maxLength: 255 },
    brand: { type: String, maxLength: 255 },
    slug: { type: String, maxLength: 255 },
    priceRange: { type: String, maxLength: 255 },
    OS: { type: String, maxLength: 255 },
    RAM: { type: String, maxLength: 255 },
    ROM: { type: String, maxLength: 255 },
    type: { type: String, maxLength: 255 },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

Item.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Item', Item);
