const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');


router.get('/', siteController.index);
router.post('/orderitems', siteController.orderHandle);
router.get('/aboutus', siteController.aboutUs);
router.get('/searchOrder', siteController.searchOrder);



module.exports = router;
