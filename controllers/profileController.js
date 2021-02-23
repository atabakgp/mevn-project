const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const getUserProfile = (req, res) => {
  const token = req.cookies.sessionid
  try {
    if (token) {
      jwt.verify(token, 'secretKey', async (err, decodedToken) => {
        if (err) {
          res.json({
            'Error': 'Token is invalid'
          })
        } else {
          const user = await User.findById(decodedToken.id)
          res.json({user})
        }
      });
    } else {
      res.json({
        'Error': 'Valid token does not exist'
      })
    }
  } catch (error) {
    console.log(error);
  }
}





module.exports = {
  getUserProfile
}