const mongoose = require('mongoose');
const Retailer = mongoose.model('Retailer'); // Replace 'Retailer' with your actual model name
const Book = require('../models/Book')
// Create a new retailer
const createRetailer = async (req, res) => {
  try {
    const retailer = new Retailer(req.body);
    await retailer.save();
    res.status(201).json(retailer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBooksByRetailer = async (req, res) => {
    try {
        const id = req.params.id;
        const books = await Book.find({ retailerID: id });
        res.status(200).json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Get retailer data by userId
const getRetailerByUserId = async (req, res) => {
  const id = req.params.id; // Assuming you pass the userId as a route parameter
  try {
    const retailer = await Retailer.findOne({ userID: id }).populate('listedBooks.bookID');
    if (!retailer) {
      return res.status(404).json({ message: 'Retailer not found' });
    }
    res.status(200).json(retailer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a retailer by userId
const updateRetailerByUserId = async (req, res) => {
  const userId = req.params.userId; // Assuming you pass the userId as a route parameter
  try {
    const retailer = await Retailer.findOneAndUpdate(
      { userID: userId },
      req.body,
      { new: true, runValidators: true }
    ).populate('listedBooks.bookID');
    if (!retailer) {
      return res.status(404).json({ message: 'Retailer not found' });
    }
    res.status(200).json(retailer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a retailer by userId
const deleteRetailerByUserId = async (req, res) => {
  const userId = req.params.userId; // Assuming you pass the userId as a route parameter
  try {
    const retailer = await Retailer.findOneAndDelete({ userID: userId });
    if (!retailer) {
      return res.status(404).json({ message: 'Retailer not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRetailer,
  getRetailerByUserId,
  updateRetailerByUserId,
  deleteRetailerByUserId,
  getBooksByRetailer
};
