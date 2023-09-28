const mongoose = require('mongoose');
const Retailer = require('./retailerModel')

const bookSchema = new mongoose.Schema(
  {
    retailerID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'retailers',
    },
    title: String,
    author: String,
    description: String,
    genre: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
