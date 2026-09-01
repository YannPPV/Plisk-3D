const express = require('express');

const router = express.Router();

const purchaseController = require('../controllers/purchaseController');

const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.checkAuth, purchaseController.createSession);
router.post('/stripe', express.raw({ type: 'application/json' }), purchaseController.webhook);

module.exports = router;
