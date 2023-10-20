var express = require("express");
const mongoose = require("mongoose");
const { default: TaskModel } = require("./models/task");
var app = express();
mongoose
  .connect("mongodb://127.0.0.1:27017/notas")
  .then(() => console.log("Connected!"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/task", async function (req, res) {
  try {
    const taskData = await TaskModel.find({});
    res.status(200).json({
      data: taskData,
    });
  } catch (error) {
    res.status(500).json({ error: "Error listar tarea." });
  }
});

app.post("/task", async function (req, res) {
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
