const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const register = async (req, res) => {
  try {
    const {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    } = req.body;
    const [userCheck] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
    if (userCheck.length === 0) {
    // 10 est le niveau de complexité du Salt
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query('INSERT INTO users(first_name, last_name, email, password) VALUES(?, ?, ?, ?)', [firstName, lastName, email, hashedPassword]);
      res.json(result);
    } else {
      res.status(400).json({ message: 'cette adresse email est déjà utilisé' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur survenue', error });
  }
};

const saveRefreshToken = async (refreshToken, idUsers) => {
  try {
    const createdAT = new Date();
    const expiresAT = new Date();
    expiresAT.setDate(createdAT.getDate() + 7);
    await db.query('INSERT INTO refresh_token(token, created_at, expires_at, id_users) VALUES (?, ?, ?, ?)', [refreshToken, createdAT, expiresAT, idUsers]);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du refresh token', error);
    throw error;
  }
};

const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const [users] = await db.query('SELECT id, email, password FROM users WHERE email = ?', [email]);
    if (users.length !== 0) {
      const loginCheck = await bcrypt.compare(password, users[0].password);
      if (loginCheck) {
        const token = jwt.sign({ id: users[0].id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }); // 3 arguments : playload, le secret, les options
        const refreshToken = jwt.sign({ id: users[0].id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        await saveRefreshToken(refreshToken, users[0].id);
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', maxAge: 604800000,
        });
        return res.json({ tokenAccess: token });
      }
    }
    return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur survenue', error });
  }
};

const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const [tokenCheck] = await db.query('SELECT token, created_at, expires_at, id_users FROM refresh_token WHERE token = ?', [token]);
    if (tokenCheck.length === 0) {
      return res.status(401).json({ message: 'token inconnu' });
    }
    if (tokenCheck[0].expires_at > new Date()) {
      return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
          return res.status(403).json({ message: 'token invalide' });
        }
        const accesstoken = jwt.sign({ id: tokenCheck[0].id_users }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        return res.json({ tokenAccess: accesstoken });
      });
    }
    return res.status(401).json({ message: 'token expiré' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur survenue', error });
  }
};

module.exports = {
  register,
  login,
  refresh,
};
