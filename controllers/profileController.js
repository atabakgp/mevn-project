const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const getUserData = (req, res) => {
  const token = req.cookies.sessionid
  try {
    if (token) {
      jwt.verify(token, 'secretKey', async (err, decodedToken) => {
        if (err) {
          res.cookie('sessionid', '', {
            maxAge: 1
          });
          res.status(402).json({
            'Error': 'Token is invalid',
          })
        } else {
          let user = await User.findById(decodedToken.id);
          user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
          res.json({
            user,
          })
        }
      });
    } else {
      res.cookie('sessionid', '', {
        maxAge: 1
      });
      res.status(402).json({
        Error: 'Valid token does not exist',
      })
    }
  } catch (error) {
    console.log('error', error);
  }
}





module.exports = {
  getUserData
}