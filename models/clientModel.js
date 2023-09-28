const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User collection
    required: true,
    ref: 'User',
  },
  orderHistory: [
    {
      orderID: mongoose.Schema.Types.ObjectId,
      bookIDs: [mongoose.Schema.Types.ObjectId], // Reference to the Book collection
      orderDate: Date,
      shippingDetails: {
        address: String,
        postalCode: String,
        country: String,
      },
      orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      },
    },
  ],
  wishList: [mongoose.Schema.Types.ObjectId], // Reference to the Book collection
  cart: {
    bookIDs: [mongoose.Schema.Types.ObjectId], // Reference to the Book collection
    totalPrice: Number,
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
