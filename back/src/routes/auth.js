const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// incription
router.post('/register', authController.register);

// login
router.post('/login', authController.login);

router.post('/refresh', authController.refresh);

router.post('/logout', authController.logout);

module.exports = router;
