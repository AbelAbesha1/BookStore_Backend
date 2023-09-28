const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookControllers');
const upload = require('../middleware/multerConfig'); 
const multer = require('multer');
const auth = require('../middleware/auth')


router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', auth , upload.single('bookImage'),bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
