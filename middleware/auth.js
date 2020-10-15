/** @format */

const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (req, res, next) => {
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
