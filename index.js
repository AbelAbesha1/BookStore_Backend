
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')

const dotenv = require('dotenv');

dotenv.config();


// MongoDB Atlas connection URI
const uri = process.env.MONGO_URL;
const app = express();
const PORT = process.env.PORT || "8000";



app.use(cors());

app.use(express.json());
const staticImagesDir = path.join(__dirname, 'public/uploads'); // __dirname is the directory where this script resides

// Serve static files from the "images" folder
app.use('/public/uploads', express.static(staticImagesDir));




mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  // Your database-related code here
});

app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/retailers', require('./routes/retailerRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });