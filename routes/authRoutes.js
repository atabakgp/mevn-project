const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
    requireAuth
} = require('../middleware/authMiddleware');
const upload = require('../helpers/multer');

router.post('/login', authController.userLogin);
router.post('/register', upload.single('avatar'), authController.userRegister);
router.get('/logout', authController.userLogout);
router.get('/checkToken', requireAuth, authController.checkToken);

module.exports = router;