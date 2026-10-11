const db = require('../config/db');

const getUserEmailByIdUser = async (Userid) => {
  const [result] = await db.query('SELECT email FROM users WHERE users.id = ?', [Userid]);
  return result[0].email;
};

module.exports = {
  getUserEmailByIdUser,
};
