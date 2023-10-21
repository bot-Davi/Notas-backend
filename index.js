var express = require("express");
const mongoose = require("mongoose");
const TaskModel = require("./models/task"); // Cambia la importación a una importación común
const jwt = require('jsonwebtoken');
const UserModel = require("./models/user");
const { authMiddleware, secretKey } = require('./middleware');
var app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/notas")
  .then(() => console.log("Connected!"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


  app.post('/login', async function (req, res) {
    try {
      const { email, password } = req.body;
  
    const user= await UserModel.findOne({
      email,password
    })
    if(
      user === null 
    )
    {
      throw new Error("credenciales incorrectas")
    }
 
    // Verificar las credenciales (esto debe personalizarse según tu implementación)
    if (email === user.email && password === user.password) {
      const userData = {
        email,
        name: user.name,
      };
  
      const token = jwt.sign(userData, secretKey, { expiresIn: '1h' }); // Generar un token válido por 1 hora
  
      res.json({ message: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
      
    } catch (error) {
      console.log(error)
      res.status(401).json({
        error:"credenciales invalidas"
      })
    }
    
  });

app.get("/task", authMiddleware, async function (req, res) {
  try {
    const taskData = await TaskModel.find({});
    res.status(200).json({
      data: taskData,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al listar las tareas." });
  }
});

app.post("/user", async function (req, res) {
  try {
    const { email, password, name } = req.body;
    const newUser = new UserModel({
      email,
      name,
      password,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log (error)
    res.status(500).json({ error: "Error al guardar usuario." });
  }
});


app.post("/task", authMiddleware, async function (req, res) {
  try {
    const { title, content } = req.body;
    const newTask = new TaskModel({
      title,
      content,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea." });
  }
});

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});

﻿





