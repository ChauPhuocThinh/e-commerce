const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://thinhst8:TyC2607@thinh.fnkjv.mongodb.net/e_commerce?retryWrites=true&w=majority');
        console.log('Successfully!!!');
    } catch (error) {
        console.log('Fail!!');
    }
}

module.exports = { connect };
