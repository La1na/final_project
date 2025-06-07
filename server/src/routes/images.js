const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const imageController = require('../controllers/Image');

// @route    POST api/images/upload
// @desc     Upload an image
// @access   Private
router.post('/upload', auth, imageController.uploadImage);

// @route    GET api/images/:imageId
// @desc     Get an image by ID
// @access   Public
router.get('/:imageId', imageController.getImageById);

module.exports = router;
