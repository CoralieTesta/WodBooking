const mongoose = require('mongoose')

const daySchema = mongoose.Schema({
    date: {type: String, required : true, unique: true},
    day: {type: String, required : true},
    eventArray: [{
        startingHour:Number,
        title:String,
        registeredNb:Number
    }]
})

module.exports = mongoose.model('Day', daySchema)