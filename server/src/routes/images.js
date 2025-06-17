const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth').protect; // Используем .protect из auth.js
const upload = require('../middleware/upload'); // Импортируем Multer middleware
const imageController = require('../controllers/Image');

// @route   POST api/images/upload
// @desc    Upload an image
// @access  Private
// При загрузке изображения сначала проходит authMiddleware.protect, затем upload.single('image'),
// и только потом imageController.uploadImage
router.post('/upload', authMiddleware, upload.single('image'), imageController.uploadImage);

// @route   GET api/images/:imageId
// @desc    Get an image by ID
// @access  Public
// Этот маршрут ведет к заглушке getImageById. Images are served statically.
router.get('/:imageId', imageController.getImageById);

module.exports = router;