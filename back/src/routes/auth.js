const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// const authMiddleware = require('../middlewares/authMiddleware');

// router.post('/register', authMiddleware.checkAuth, authController.register);

// incription
router.post('/register', authController.register);

// connection
router.post('/login', authController.login);

router.post('/refresh', authController.refresh);

router.post('/logout', authController.logout);

module.exports = router;
