const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/bookEvent', userCtrl.bookEvent)
router.get('/:email', userCtrl.get)
router.put('/quitEvent', userCtrl.quitEvent)

module.exports = router;