const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Middleware para verificar si el usuario está autenticado
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido.' });
    }
    req.user = user;
    next();
  });
};

// Middleware para verificar si el usuario tiene el rol adecuado
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acceso denegado. No tiene permisos suficientes.' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};