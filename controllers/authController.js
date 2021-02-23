const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

// Handle errors 
const handleRegisterErrors = (error) => {
  let errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  // incorrect email 
  if (error.message === 'incorrect email') {
    errors.email = 'This email is not registered'
  }
  // incorrect password 
  if (error.message === 'incorrect password') {
    errors.password = 'this password is incorrect'
  }

  // duplicate error code 
  if (error.code == 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // validation errors
  if (error.message.includes('users validation failed')) {
    Object.values(error.errors).forEach(err => {
      errors[err.properties.path] = err.properties.message;
    });
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

  // duplicate error code 
  if (error.code == 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // validation errors
  if (error.message.includes('users validation failed')) {
    Object.values(error.errors).forEach(err => {
      errors[err.properties.path] = err.properties.message;
    });
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
  res.cookie('sessionid', '', {
    maxAge: 1
  });
  res.json({login: false})
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
}