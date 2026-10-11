const basketModel = require('../models/basketsModels');

const getBasketId = async (idUser) => {
  const basket = await basketModel.getBasketIdByUserId(idUser);
  const { id } = basket[0];
  return id;
};

const addProductToBasket = async (req, res) => {
  try {
    const idBasket = await getBasketId(req.idUser);
    const checkProducts = await basketModel.checkProductsInBasketsExists(req.params.id, idBasket);
    if (checkProducts.length === 0) {
      await basketModel.insertProductInBasket(req.params.id, idBasket);
      return res.status(200).json({ message: 'article ajouté' });
    }
    await basketModel.updateQuantityByIdProductsAndIdBaskets(
      checkProducts[0].quantity + 1,
      req.params.id,
      idBasket,
    );
    return res.status(200).json({ message: 'quatité modifié' });
  } catch (error) {
    return res.status(500).json({ message: 'une erreur est survenue', error: error.message });
  }
};

const getBasket = async (req, res) => {
  try {
    const basket = await basketModel.getBasket(req.idUser);
    return res.status(200).json(basket);
  } catch (error) {
    return res.status(500).json({ message: 'une erreur est survenue', error: error.message });
  }
};

const deleteProductFromBasket = async (req, res) => {
  try {
    const idBasket = await getBasketId(req.idUser);
    await basketModel.deleteProductsInBaskets(req.params.id, idBasket);
    return res.status(200).json({ message: 'article supprimé' });
  } catch (error) {
    return res.status(500).json({ message: 'une erreur est survenue', error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    if (req.body.quantity === 0) {
      return deleteProductFromBasket(req, res);
    } if (req.body.quantity < 0) {
      return res.status(400).json({ message: 'valeur invalide' });
    }
    const idBasket = await getBasketId(req.idUser);
    await basketModel.updateQuantityByIdProductsAndIdBaskets(
      req.body.quantity,
      req.params.id,
      idBasket,
    );
    return res.status(200).json({ message: 'quatité modifié' });
  } catch (error) {
    return res.status(500).json({ message: 'une erreur est survenue', error: error.message });
  }
};

module.exports = {
  addProductToBasket,
  getBasket,
  updateQuantity,
  deleteProductFromBasket,
};
