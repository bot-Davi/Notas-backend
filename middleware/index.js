const jwt = require('jsonwebtoken');

const secretKey = 'tu_secreto_secreto';

// Middleware de autenticación basado en token
const authMiddleware = (req, res, next) => {
const token = req.header('Authorization');
 if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Almacena la información del usuario en el objeto `req` si el token es válido
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Token no válido' });
  }
};

module.exports = { authMiddleware, secretKey };