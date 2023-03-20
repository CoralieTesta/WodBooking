const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
          bookingArray: []
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.bookEvent = (req, res, next) => {
    console.log("book event", req.body)
    const filter = { email : req.body.email}
    User.updateOne(filter, { $push : { bookingArray: { 
        date: req.body.date,
        startingHour: req.body.startingHour,
        title: req.body.title
    }}})
    .then(() => res.status(200).json({message : 'Objet modifié!'}))
    .catch(error => res.status(401).json({ error }));
}

exports.get = (req, res, next) => {
    const filter= req.params //email
    console.log("user get", filter)
    User.findOne(filter)
        .then(day => res.status(200).json(day))
        .catch(error => res.status(400).json({error}))
}

exports.quitEvent = (req, res, next) => {
    console.log("quit event", req.body)
    const filter = { email : req.body.email}
    User.findOne(filter)
        .then((user) => {
            console.log("bookarr",user.bookingArray)
            const modifiedBookingArray = user.bookingArray.filter(
                (bookingItem) => bookingItem.date !== req.body.date
                                || bookingItem.startingHour !== req.body.startingHour
            )
            console.log("mod",modifiedBookingArray)
            User.updateOne(filter, {$set:{ bookingArray: modifiedBookingArray }})
            .then(console.log("day deleted"))
            .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}