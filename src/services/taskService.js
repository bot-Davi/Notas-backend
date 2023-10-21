const TaskModel = require("../models/task");

const getTask = async (data) => {
  try {
    const taskData = await TaskModel.find({author:data.id}).populate({
      path: "author",
      select: "name email",
    });
    return taskData;
  } catch (error) {
    throw new Error("Error al listar las tasks");
  }
};

const createTask = async (data) => {
  try {
    const { title, content, author } = data;
    const newTask = new TaskModel({
      title,
      author: author.id,
      content,
    });
    const savedTask = await newTask.save();
    return savedTask;
  } catch (error) {
    throw new Error("Error al crear la tarea");
  }
};

module.exports = { getTask, createTask };
