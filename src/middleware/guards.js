const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  const token = header.substring(7);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload; 
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'No autorizado' });
    return next();
  };
}

module.exports = { requireAuth, allowRoles };
