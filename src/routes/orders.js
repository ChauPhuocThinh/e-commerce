const express = require('express');
const orderController = require('../app/controllers/orderController');
const router = express.Router();

router.get('/:id/view', orderController.view);
router.put('/:id', orderController.update);
router.delete('/:id', orderController.delete);

module.exports = router;
