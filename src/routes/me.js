const express = require('express');
const meController = require('../app/controllers/meController');
const router = express.Router();
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, filename + '-' + file.originalname)
    }
  })
var upload = multer({ storage: storage })
router.get('/stored/items', meController.stored);
router.get('/trash/items', meController.trashItems);
router.get('/orders', meController.orders);
router.get('/trash/orders', meController.trashOrders);
router.get('/accounts', meController.accounts);
router.get('/', meController.me);
router.put('/',upload.single('avatar'), meController.update);
router.get('/edit', meController.edit);
router.delete('/accounts/:id', meController.delete);

module.exports = router;
