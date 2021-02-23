const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login',authController.userLogin);
router.post('/register', authController.userRegister);
router.get('/logout', authController.userLogout);

module.exports = router;
