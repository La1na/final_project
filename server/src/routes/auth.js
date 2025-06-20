const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const userController = require('../controllers/User');
const signup = require('../middleware/signup');
const login = require('../middleware/login');


const validateRegistration = [
  body('username', 'Username is required').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

const validateLogin = [
  body('usernameOrEmail', 'Username or Email is required').notEmpty(),
  body('password', 'Password is required').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];


router.post('/register', validateRegistration, signup);
router.post('/login', validateLogin, login);
router.post('/forgot-password', userController.forgotPassword);


router.get('/', auth, userController.getUser);
router.get('/protected', auth, userController.protectedRoute);

module.exports = router;
