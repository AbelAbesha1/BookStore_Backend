// userRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')


// Import the User controller
const UserController = require('../controllers/userController');

// Define routes for User resource
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/',  UserController.createUser);
router.put('/:id', auth , UserController.updateUser);
router.delete('/:id', auth ,  UserController.deleteUser);

module.exports = router;
