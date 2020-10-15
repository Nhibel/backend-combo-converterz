/** @format */

const express = require('express');
const history = require('connect-history-api-fallback')
//const serveStatic = require('serve-static')

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const gameRoutes = require('./routes/game');
const rosterRoutes = require('./routes/roster');
const userRoutes = require('./routes/user');
const comboRoutes = require('./routes/combo');

const config = require('./config.json');
let password = config.password;
let username = config.username;

mongoose
  .connect(`mongodb+srv://${username}:${password}@combo-converterz.quwqy.mongodb.net/combo-converterz?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(history());
//app.use(serveStatic(__dirname))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/combos', comboRoutes);
app.use('/games', gameRoutes);
app.use('/characters', rosterRoutes);
app.use('/auth', userRoutes);

module.exports = app;
