const express = require("express");
const mongoose = require("mongoose");
const { MONGO_DB_URI } = require("./constants");
const app = express();
app.use(express.json());
const authRoutes = require("./routes/authRoute");
const taskRoutes = require("./routes/taskRoute");
console.log(MONGO_DB_URI)
mongoose
  .connect(MONGO_DB_URI)
  .then(() => console.log("Connected!"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

//Rutas
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

app.listen(3000, function () {
  console.log("App listening on port 3000!");
});
