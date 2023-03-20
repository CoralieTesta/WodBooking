const express = require('express');
const router = express.Router()

const dayEventsCtrl = require('../controllers/dayEvents')

router.get('/:day', dayEventsCtrl.get)

module.exports = router