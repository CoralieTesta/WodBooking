const mongoose = require('mongoose')

const dayEventsSchema = mongoose.Schema({
    day: {type: String, required : true},
    eventArray: [{
        startingHour:Number,
        title:String
    }]
})

module.exports = mongoose.model('DayEvents', dayEventsSchema)