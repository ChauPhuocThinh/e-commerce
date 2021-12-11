const express = require('express');
const itemController = require('../app/controllers/itemController');
const router = express.Router();

router.get('/create', itemController.create);
router.post('/store', itemController.createHandle);
router.get('/:id/edit', itemController.edit);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);
//router.add('/orders', itemController.add);
router.get('/:slug', itemController.show);
router.post('/orderitems', itemController.orderHandle);

module.exports = router;
