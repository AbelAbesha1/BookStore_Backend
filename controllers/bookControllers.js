const Book = require("../models/Book");
const crypto = require("crypto");
const Retailer = require('../models/retailerModel');



exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.setHeader('Content-Type', 'image/jpeg'); 
    res.json(books);
  
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createBook = async (req, res) => {
  try {
    // Access the uploaded file details via req.file
    const bookImage = req.file.filename;

    // Extract other book properties from the request body
    const { title, author, description, genre, price } = req.body;

    // Retrieve the retailerId associated with the authenticated user's userID
    const userID = req.user._id; // Assuming the user's ID is stored in _id
    const retailer = await Retailer.findOne({ userID });

    if (!retailer) {
      return res.status(401).json({ message: 'Unauthorized - Retailer not found' });
    }

  

    const retailerId = retailer._id; 

    
    const book = new Book({
      retailerID: retailerId,
      title,
      author,
      description,
      genre,
      price,
      image: bookImage, // Store the image file path
    });

    // Save the new book to MongoDB
    await book.save();

    retailer.listedBooks.push({
      bookID: book._id, // Assuming _id is the book's ID field
      listingDate: new Date(),
      price,
      stockQuantity: 0, // You can set the initial stock quantity as needed
    });

    // Save the updated retailer document with the new book reference
    await retailer.save();

    // Populate the listedBooks array in the retailer object
    const updatedRetailer = await Retailer.findById(retailerId).populate('listedBooks.bookID');

    res.status(201).json(book);
  } catch (err) {
    console.error(err); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    // First, delete the book from the 'books' collection
    const deletedBook = await Book.findByIdAndRemove(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

