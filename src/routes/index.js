const meRouter = require('./me');
const coursesRouter = require('./items');
const siteRouter = require('./site');
const ordersRouter = require('./orders');
const usersRouter = require('./users');
const contentsRouter = require('./contents');

function route(app) {
    app.use('/me', meRouter);
    app.use('/items', coursesRouter);
    app.use('/', siteRouter);
    app.use('/orders', ordersRouter);
    app.use('/users', usersRouter);
    app.use('/content', contentsRouter);
}
module.exports = route;
