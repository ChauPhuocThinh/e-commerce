const express = require('express');
const itemController = require('../app/controllers/itemController');
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
router.get('/create', itemController.create);
router.post('/store',upload.single('image'), itemController.createHandle);
router.get('/:id/edit', itemController.edit);
router.post('/deleteMany', itemController.deleteMany);
router.put('/:id',upload.single('image'), itemController.update);
router.delete('/:id', itemController.delete);
router.delete('/:id/force', itemController.deleteForce);
router.patch('/:id/restore', itemController.restore);
router.patch('/restoreMany', itemController.restoreMany);
//router.add('/orders', itemController.add);
router.get('/:slug', itemController.show);
router.post('/orderitems', itemController.orderHandle);

module.exports = router;
