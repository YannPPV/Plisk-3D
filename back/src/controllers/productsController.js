const db = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur survenue', error });
  }
};

const getProductsById = async (req, res) => {
  // récupère l'id dans l'URL
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    const rows = result[0];

    if (rows.length === 0) {
      // .json() transforme l'erreur en message et l'envoie
      return res.status(404).json({ message: 'Produit ' });
    }
    return res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur survenue', error });
  }
};

module.exports = { getAllProducts, getProductsById };
