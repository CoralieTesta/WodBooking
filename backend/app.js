const express = require('express')
const cron = require('node-cron');
const app = express()
const mongoose = require('mongoose')
const dayEventsRoutes = require('./routes/dayEvents')
const dayRoutes = require('./routes/day')
const userRoutes = require('./routes/user')
const emailRoutes = require('./routes/email');

mongoose.connect(
    'mongodb+srv://CoralieTesta:Barjobars29@cluster0.zn0gkpg.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch(() => console.log('Connexion à MongoDB échouée !')
);


app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/dayEvents', dayEventsRoutes)
app.use('/api/day', dayRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/email', emailRoutes);

module.exports = app