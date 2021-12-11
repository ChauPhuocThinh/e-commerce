const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

router.get('/search', siteController.search);
router.get('/', siteController.index);
router.post('/orderitems', siteController.orderHandle);
router.get('/aboutus', siteController.aboutUs);


module.exports = router;
