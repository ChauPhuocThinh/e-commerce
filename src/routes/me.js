const express = require('express');
const meController = require('../app/controllers/meController');
const router = express.Router();

router.get('/stored/items', meController.stored);
router.get('/orders', meController.orders);
router.get('/accounts', meController.accounts);
router.get('/', meController.me)
router.put('/', meController.update)
router.get('/edit', meController.edit)
router.delete('/accounts/:id', meController.delete);

module.exports = router;
