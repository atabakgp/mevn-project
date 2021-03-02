const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.cookies.sessionid;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'secretKey', (err, decodedToken) => {
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

module.exports = {
  requireAuth,
}