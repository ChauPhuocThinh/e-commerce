const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    name: { type: String, required: true },
    nameItems: { type: String, maxLength: 1000 },
    total: { type: String },
    address: { type: String, maxLength: 255 },
    phoneNumber: { type: String, maxLength: 255 },
    note:{type: String},
    status: { type: String, default: 'Mới' },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', Order);
