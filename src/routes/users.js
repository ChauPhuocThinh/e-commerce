const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
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
router.get('/signup', userController.signUp);
router.post('/signup',upload.single('avatar'), userController.signUpHandle);
router.get('/signin', userController.signIn);
router.post('/signin', userController.signInHandle);
router.get('/', userController.user);
router.get('/signout', userController.signOut);
router.get('/user/:id', userController.edit);
router.put('/user/:id', userController.update);
module.exports = router;
