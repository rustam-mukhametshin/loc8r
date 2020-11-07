const express = require('express');
const router = express.Router();
const {index} = require('../controllers/main');

/* GET home page. */
router.get('/', index);

module.exports = router;
