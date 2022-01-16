const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');

router.get('/', siteController.index);
router.post('/orderitems', siteController.orderHandle);
router.get('/aboutus', siteController.aboutUs);
router.get('/helps', siteController.helps);
router.get('/policies', siteController.policies);
router.get('/searchOrder', siteController.searchOrder);
router.get('/searchItems', siteController.searchItems);
module.exports = router;
