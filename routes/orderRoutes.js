const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth')
const router = express.Router();

// Route to create a new order
router.post('/', auth , orderController.createOrder);

module.exports = router;
