const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (auth === undefined) {
    return res.status(401).json({ message: 'token inexistant' });
  }
  const token = auth.slice(7);
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'token non valide' });
    }
    req.idUser = decoded.id;
    return next();
  });
}

module.exports = { checkAuth };
