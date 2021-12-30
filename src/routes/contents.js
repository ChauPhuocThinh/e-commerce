const express = require('express');
const contentController = require('../app/controllers/contentController');
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
router.get('/view', contentController.view);
router.put('/view',upload.fields([{
    name: 'poster123', maxCount: 3
  }, {
    name: 'poster4', maxCount: 1
  }]), contentController.update);

module.exports = router;
