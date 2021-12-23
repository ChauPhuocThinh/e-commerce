const express = require('express');
const itemController = require('../app/controllers/itemController');
const router = express.Router();

router.get('/create', itemController.create);
router.post('/store', itemController.createHandle);
router.get('/:id/edit', itemController.edit);
router.post('/deleteMany', itemController.deleteMany);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);
router.delete('/:id/force', itemController.deleteForce);
router.patch('/:id/restore', itemController.restore);
router.patch('/restoreMany', itemController.restoreMany);
//router.add('/orders', itemController.add);
router.get('/:slug', itemController.show);
router.post('/orderitems', itemController.orderHandle);

module.exports = router;
