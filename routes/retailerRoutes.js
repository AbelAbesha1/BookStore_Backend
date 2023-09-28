const express = require('express');
const router = express.Router();
const retailerController = require('../controllers/retailerController');
const auth = require('../middleware/auth')

// Create a new retailer
router.post('/', retailerController.createRetailer);

// Get retailer data by userId
router.get('/:id', retailerController.getRetailerByUserId);

// Update a retailer by userId
router.put('/:id', retailerController.updateRetailerByUserId);

// Delete a retailer by userId
router.delete('/:id', retailerController.deleteRetailerByUserId);
// get books by retailer
router.get('/:id/books', auth , retailerController.getBooksByRetailer);


module.exports = router;