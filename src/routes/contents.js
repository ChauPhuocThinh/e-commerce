const express = require('express');
const contentController = require('../app/controllers/contentController');
const router = express.Router();

router.get('/view', contentController.view);
router.put('/view', contentController.update);


module.exports = router;
