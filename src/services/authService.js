const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_JWT } = require("../constants");

const loginUser = async (data) => {
  try {
    const { email, password } = data;
    const user = await UserModel.findOne({
      email,
      password,
    });
    if (user === null) {
      throw new Error("Usuario incorrecto");
    }

    if (email === user.email && password === user.password) {
      const userData = {
        id: user._id,
        email,
        name: user.name,
      };

      const token = jwt.sign(userData, SECRET_JWT, { expiresIn: "1h" });
      return token;
    } else {
      throw new Error("Credenciales incorrectas");
    }
  } catch (error) {
    throw new Error("Error al iniciar sesión");
  }
};

const registerUser = async (data) => {
  try {
    const { email, password, name } = data;
    const newUser = new UserModel({
      email,
      name,
      password,
    });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error("Error al registrar usuario");
  }
};


module.exports = { registerUser, loginUser };

