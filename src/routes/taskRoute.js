const express = require("express");
const router = express.Router();
const { getTask, createTask } = require("../services/taskService");
const { authMiddleware } = require("../middleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const data = await getTask(req.user);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", authMiddleware, async function (req, res) {
  try {
    const savedTask = await createTask({ ...req.body, author: req.user });
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
