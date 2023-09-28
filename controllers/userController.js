const User = require('../models/UserModel');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    const user = new User({ username, password, email, role});
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }     
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  console.log(req.user.role)


  if (req.user.userId === req.params.id || req.user.role === "Admin" ) {
    try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) { 
    res.status(500).json({ error: 'Internal Server Error' });
  }
  } else {
    res.status(403).json('you are not allwed to delete This User')  
  } 
  
};
