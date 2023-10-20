import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
});

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
