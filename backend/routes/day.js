const express = require('express');
const router = express.Router()
const auth = require('../middleware/auth');

const dayCtrl = require('../controllers/day')

router.post('/create', auth, dayCtrl.create)
router.get('/:date_day/:date_month/:date_year', auth, dayCtrl.get)
router.put('/addParticipant', auth, dayCtrl.addParticipant)
router.put('/removeParticipant', auth, dayCtrl.removeParticipant)

module.exports = router