const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
  const token = req.cookies.sessionid;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'thisissecret', (err, decodedToken) => {
      if (err) {
        res.json({notLoggedIn})
      } else {
        console.log(decodedToken);
        res.json({loggedIn});
      }
    });
  } else {
    res.json({notLoggedIn})
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