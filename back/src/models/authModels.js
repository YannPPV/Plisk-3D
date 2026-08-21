const db = require('../config/db');

const checkEmailExists = async (email) => {
  const [checkEmail] = await db.query('SELECT email FROM users WHERE email = ?', [email]);
  return checkEmail;
};

const insertUser = async (firstName, lastName, email, hashedPassword) => {
  const [result] = await db.query('INSERT INTO users(first_name, last_name, email, password) VALUES(?, ?, ?, ?)', [firstName, lastName, email, hashedPassword]);
  return result;
};

const insertToken = async (refreshToken, createdAT, expiresAT, idUsers) => {
  const [result] = await db.query('INSERT INTO refresh_token(token, created_at, expires_at, id_users) VALUES (?, ?, ?, ?)', [refreshToken, createdAT, expiresAT, idUsers]);
  return result;
};

const getUserByEmail = async (email) => {
  const [user] = await db.query('SELECT id, email, password FROM users WHERE email = ?', [email]);
  return user;
};

const getToken = async (token) => {
  const [tokenCheck] = await db.query('SELECT token, created_at, expires_at, id_users FROM refresh_token WHERE token = ?', [token]);
  return tokenCheck;
};

const deleteRefreshTokenByToken = async (token) => {
  const [tokenCheck] = await db.query('DELETE FROM refresh_token WHERE token = ?', [token]);
  return tokenCheck;
};

module.exports = {
  checkEmailExists,
  insertUser,
  insertToken,
  getUserByEmail,
  getToken,
  deleteRefreshTokenByToken,
};
