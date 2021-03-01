const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  requireAuth
} = require('../middleware/authMiddleware');

router.post('/login', authController.userLogin);
router.post('/register', authController.userRegister);
router.get('/logout', authController.userLogout);
router.get('/checkToken', requireAuth, authController.checkToken);

module.exports = router;