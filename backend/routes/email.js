const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/email');

router.post('/send', userCtrl.send);

module.exports = router;