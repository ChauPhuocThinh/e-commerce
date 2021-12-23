const express = require('express');
const meController = require('../app/controllers/meController');
const router = express.Router();

router.get('/stored/items', meController.stored);
router.get('/trash/items', meController.trashItems);
router.get('/orders', meController.orders);
router.get('/trash/orders', meController.trashOrders);
router.get('/accounts', meController.accounts);
router.get('/', meController.me)
router.put('/', meController.update)
router.get('/edit', meController.edit)
router.delete('/accounts/:id', meController.delete);

module.exports = router;
