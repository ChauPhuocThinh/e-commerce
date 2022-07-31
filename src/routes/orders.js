const express = require('express');
const orderController = require('../app/controllers/orderController');
const router = express.Router();

router.get('/:id/view', orderController.view);
router.put('/:id', orderController.update);
router.delete('/:id/force', orderController.deleteForce);
router.delete('/:id/', orderController.delete);
router.post('/deleteMany', orderController.deleteMany);
router.patch('/:id/restore', orderController.restore);
router.patch('/restoreMany', orderController.restoreMany);
module.exports = router;
