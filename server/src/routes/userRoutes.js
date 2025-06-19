const express = require('express');
const router = express.Router();
const { seedUsers, getAllUsers, searchUsers, notification, updateUserProfile } = require('../controllers/userController');

router.post('/seed', seedUsers);
router.get('/', getAllUsers);
router.get('/search', searchUsers);
router.get('/notification', notification)

router.put('/:id', updateUserProfile)
module.exports = router;
