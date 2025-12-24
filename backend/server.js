const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; // in-memory storage

// SIGN IN / SIGN UP
app.post("/login", (req, res) => {
  const { username } = req.body;

  if (!users[username]) {
    users[username] = { tasks: [] };
  }

  res.json(users[username]);
});

// GET TASKS
app.get("/tasks/:username", (req, res) => {
  res.json(users[req.params.username]?.tasks || []);
});

// ADD TASK
app.post("/tasks/:username", (req, res) => {
  users[req.params.username].tasks.push(req.body);
  res.json(users[req.params.username].tasks);
});

// UPDATE TASK
app.put("/tasks/:username/:index", (req, res) => {
  users[req.params.username].tasks[req.params.index].done = req.body.done;
  res.json(users[req.params.username].tasks);
});

// DELETE TASK
app.delete("/tasks/:username/:index", (req, res) => {
  users[req.params.username].tasks.splice(req.params.index, 1);
  res.json(users[req.params.username].tasks);
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
