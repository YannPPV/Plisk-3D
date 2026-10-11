const express = require('express');

const router = express.Router();

const basketsController = require('../controllers/basketController');

const authMiddleware = require('../middlewares/authMiddleware');

// route
router.get('/', authMiddleware.checkAuth, basketsController.getBasket);

router.post('/item/:id', authMiddleware.checkAuth, basketsController.addProductToBasket);

router.delete('/item/:id', authMiddleware.checkAuth, basketsController.deleteProductFromBasket);

router.put('/item/:id', authMiddleware.checkAuth, basketsController.updateQuantity);

module.exports = router;
