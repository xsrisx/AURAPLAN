const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// ADD TODO
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// GET TODOS
router.get("/:userId", async (req, res) => {
  const todos = await Todo.find({ userId: req.params.userId });
  res.json(todos);
});

module.exports = router;
