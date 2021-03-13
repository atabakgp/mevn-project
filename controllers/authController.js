const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

// Handle errors 
const handleRegisterErrors = (error) => {
  let errors = {
    email: '',
  };

  // duplicate error code 
  if (error.code == 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }
  return errors;
}

// Handle errors 
const handleLoginErrors = (error) => {
  let errors = {
    email: '',
    password: ''
  };

  // incorrect email 
  if (error.message === 'incorrect email') {
    errors.email = 'This email is not registered'
  }
  // incorrect password 
  if (error.message === 'incorrect password') {
    errors.password = 'This password is incorrect'
  }

  return errors;
}


// Create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({
    id
  }, 'secretKey', {
    expiresIn: maxAge
  })
}

// Create new user
const userRegister = async (req, res) => {

  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });
    const token = createToken(user._id);
    res.cookie('sessionid', token, {
      httpOnly: true,
    });
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  } catch (error) {
    const errors = handleRegisterErrors(error);
    res.json({
      errors
    });
  }
}

// User login
const userLogin = async (req, res) => {
  const {
    email,
    password,
  } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('sessionid', token, {
      httpOnly: true
    })
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    const errors = handleLoginErrors(error);
    res.json({
      errors
    });
  }
}

// user logout
const userLogout = (req, res) => {
  try {
    res.cookie('sessionid', '', {
      maxAge: 1
    });
    res.send('logout success')
  } catch (error) {
    res.send(error)
  }
}

// check token
const checkToken = (req, res) => {
  try {
    res.status(200).send('Succuess');
  } catch (error) {
    res.send(error)
  }
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  checkToken
}