const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    avatar: { type: String },
    address: { type: String },
    ID: { type: String },
    dateofBirth: { type: String },
    role: { type: String },
    display: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);
