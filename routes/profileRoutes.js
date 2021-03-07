const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profile',profileController.getUserData)
router.post('/profile',profileController.updateUserData)

module.exports = router;