const Day = require('../models/Day')

exports.get = (req, res, next) => {
    console.log("day get")
    const date = req.params.date_day + "/"+req.params.date_month +"/"+req.params.date_year
    Day.findOne({date: date})
    .then(day => res.status(200).json(day))
    .catch(error => res.status(400).json({error}))
}

exports.create = (req, res, next) => {
    console.log("day create", req.body)
    const day =req.body
    delete day._id
    day.eventArray.map(event => {
        delete event._id
        event.registeredNb= 0
    })
    const newDay = new Day({...day})
    console.log("apres day create", newDay)
    newDay.save()
        .then(() => res.status(201).json({message: 'Objet enregistré'}))
        .catch(error => res.status(400).json({error}))
}

exports.addParticipant = (req, res, next) => {
    const filter = {date: req.body.date}
    console.log("add participant")
    Day.findOne(filter)
        .then((day) => {
            const newEventArray = day.eventArray.reduce(
                (accumulator, currentValue) => {
                    if(currentValue.startingHour === req.body.startingHour) {
                        currentValue.registeredNb++
                    }
                    return([
                        ...accumulator,
                        currentValue
                    ])
                },[]
            )
            Day.updateOne(filter, {$set: {eventArray:newEventArray}})
            .then(console.log("participant added"))
            .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

exports.removeParticipant = (req, res, next) => {
    const filter = {date: req.body.date}
    console.log("remove participant")
    Day.findOne(filter)
        .then((day) => {
            const newEventArray = day.eventArray.reduce(
                (accumulator, currentValue) => {
                    if(currentValue.startingHour === req.body.startingHour) {
                        currentValue.registeredNb--
                    }
                    return([
                        ...accumulator,
                        currentValue
                    ])
                },[]
            )
            Day.updateOne(filter, {$set: {eventArray:newEventArray}})
            .then(console.log("participant removed"))
            .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}
