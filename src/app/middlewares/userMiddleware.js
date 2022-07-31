const User = require('../models/user');
module.exports = async function userMiddleware(req, res, next) {
    if (
        req.session.successSignin == 'Admin' ||
        req.session.successSignin == 'Mod' ||
        req.session.successSignin == 'Salesman'
    ) {
        const user = await User.findOne({ email: req.session.email });
        res.locals.user = {
            fullName: user.fullName,
            avatar: user.avatar,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            avatar: user.avatar,
            address: user.address,
            ID: user.ID,
            dateofBirth: user.dateofBirth,
            role: user.role,
            display: user.display,
            createdAt: user.createdAt,
            updateAt: user.updateAt,
        };
    } else {
        res.locals.user = {
            fullName: '',
            avatar: '',
            email: '',
            phoneNumber: '',
            password: '',
            avatar: '',
            address: '',
            ID: '',
            dateofBirth: '',
            role: '',
            display: '',
            createdAt: '',
            updateAt: '',
        };
    }

    next();
};
