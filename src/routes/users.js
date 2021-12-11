const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.get('/signup', userController.signUp)
router.post('/signup', userController.signUpHandle)
router.get("/signin", userController.signIn)
router.post('/signin', userController.signInHandle)
router.get('/', userController.user)
router.get('/signout', userController.signOut)
router.get('/user/:id', userController.edit)
router.put('/user/:id', userController.update)
module.exports = router;