const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const {
  requireAuth
} = require('../middleware/authMiddleware');

router.get('/products', orderController.getProducts)
router.get('/product-details/:id', orderController.getProductById)

module.exports = router;