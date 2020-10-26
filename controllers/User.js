/** @format */

const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        isAdmin: 0,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            auth: true,
            token: jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }),
            refresh_token: jwt.sign({ userId: user._id }, config.secret, { expiresIn: '7d' }),
            user: user,
            message: 'Utilisateur créé !',
          })
        )
        .catch((error) => res.status(400).json({ error: error, message: 'Erreur lors de la création du compte' }));
    })
    .catch((error) => res.status(500).json({ error: error.message, message: 'Erreur lors de la création du compte' }));
};

exports.signupAdmin = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        isAdmin: 1,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            auth: true,
            token: jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }),
            refresh_token: jwt.sign({ userId: user._id }, config.secret, { expiresIn: '7d' }),
            user: user,
            message: 'Utilisateur créé !',
          })
        )
        .catch((error) => res.status(400).json({ error: error, message: 'Erreur lors de la création du compte' }));
    })
    .catch((error) => res.status(500).json({ error: error, message: 'Erreur lors de la création du compte' }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            auth: true,
            user: user,
            userId: user._id,
            token: jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }),
            refresh_token: jwt.sign({ userId: user._id }, config.secret, { expiresIn: '7d' }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.me = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      res.status(200).json({ user: user });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.verifyToken = (req, res, next) => {
  var secret = config.secret;
  try {
    const token = req.body.token;
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    if (req.body.user._id && req.body.user._id !== userId) {
      console.log('erreur dans le throw', req.body.user._id, userId)
      throw 'Invalid user ID';
    } else {
      return res.status(200).json({
        token: jwt.sign({ userId: userId }, config.secret, { expiresIn: '24h' }),
        refresh_token: jwt.sign({ userId: userId }, config.secret, { expiresIn: '7d' }),
      });
    }
  } catch (error) {
    console.log('erreur dans le catch(error)', error)
    return res.status(401).json({ error });
  }
};

/**
 * module.exports = (req, res, next) => {
  var secret = config.secret;
  try {
    const token = req.headers.authorization;
    // const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    req.user = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error,
    });
  }
};
 */
