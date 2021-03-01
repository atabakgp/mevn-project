const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.sessionid;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'secretKey', (err, decodedToken) => {
      console.log(decodedToken);
      if (err) {
        res.status(402).send('Unauthorized: Invalid token');
      } else {
        next()
      }
    });
  } else {
    res.status(402).send('Unauthorized: Token dont exist');
  }
}

// check the curent user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'thisissecret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = {
  requireAuth,
  checkUser
}