const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
    requireAuth
} = require('../middleware/authMiddleware');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'vue/public/uploads/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/login', authController.userLogin);
router.post('/register', upload.single('avatar'), authController.userRegister);
router.get('/logout', authController.userLogout);
router.get('/checkToken', requireAuth, authController.checkToken);

module.exports = router;