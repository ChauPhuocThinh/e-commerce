module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };
    if (req.query.hasOwnProperty('_sort')) {
        res.locals._sort.enabled = true;
        res.locals._sort.type = req.query.type;
        res.locals._sort.column = req.query.column;
        res.locals._sort.brand = req.query.brand;
    }
    res.locals._filter = {
        brand: 'all',
        type: 'all',
        priceRange: 'all',
    };
    if (req.query.hasOwnProperty('_filter')) {
        res.locals._filter.brand = req.query.brand;
        res.locals._filter.type = req.query.type;
        res.locals._filter.priceRange = req.query.priceRange;
    }
    next();
};
