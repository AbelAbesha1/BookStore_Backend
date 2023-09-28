const mongoose = require('mongoose');
const User = require('./UserModel'); 
const Book = require('./Book');

const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    required: true,
    ref: 'User', 
  },
  bookIDs: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      required: true,
      ref: 'Book', 
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now, 
  },
  shippingDetails: {
    address: String,
    postalCode: String,
    country: String,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
