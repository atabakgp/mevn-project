const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/products', orderController.getProducts)

module.exports = router;