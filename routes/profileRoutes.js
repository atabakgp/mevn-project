const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profile',profileController.getUserData)

module.exports = router;