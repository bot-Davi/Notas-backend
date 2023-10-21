require("dotenv").config();
module.exports = {
  MONGO_DB_URI: process.env.MONGO_DB_URI || "mongodb://localhost:27017/notas",
  SECRET_JWT: process.env.SECRET_JWT || "test123",
};
