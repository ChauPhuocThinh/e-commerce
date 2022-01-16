const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var mongooseDelete = require('mongoose-delete');
const Order = new Schema(
    {
        name: { type: String, required: true },
        nameItems: { type: String, maxLength: 1000 },
        total: { type: String },
        address: { type: String, maxLength: 255 },
        phoneNumber: { type: String, maxLength: 255 },
        note: { type: String },
        _id: { type: Number },
        status: { type: String, default: 'a' },
        paymentMethods: { type: String},
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now },
    },
    {
        _id: false,
    },
);
Order.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });
module.exports = mongoose.model('Order', Order);
