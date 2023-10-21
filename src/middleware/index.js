const jwt = require("jsonwebtoken");
const { SECRET_JWT } = require("../constants");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ error: "Formato de token no válido" });
    }

    const decoded = jwt.verify(token, SECRET_JWT);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Token no válido" });
  }
};

module.exports = { authMiddleware };
