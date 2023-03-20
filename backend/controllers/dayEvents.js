const DayEvents = require('../models/DayEvents')

exports.get = (req, res, next) => {
    console.log("dayEvents get")
    const day = req.params.day
    DayEvents.findOne({day: day})
    .then(day => res.status(200).json(day))
    .catch(error => res.status(400).json({error}))
}