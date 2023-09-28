const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    required: true,
    ref: 'User',
  },
  listedBooks: [
    {
      bookID: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Book collection
        required: true,
        ref: 'Book',
      },
      listingDate: Date,
      price: Number,
      stockQuantity: Number,
    },
  ],
  salesHistory: [
    {
      saleID: mongoose.Schema.Types.ObjectId,
      bookID: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Book collection
        required: true,
        ref: 'Book',
      },
      saleDate: Date,
      amount: Number,
    },
  ],
});

const Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;
