import React, { useState, useEffect } from "react";
import "./TodoList.css";

const TodoList = ({ username }) => {
  // Load tasks from localStorage for this user
  const [tasks, setTasks] = useState(() => {
    if (!username) return [];
    const saved = localStorage.getItem(`tasks-${username}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Save tasks whenever they change
  useEffect(() => {
    if (username) {
      localStorage.setItem(`tasks-${username}`, JSON.stringify(tasks));
    }
  }, [tasks, username]);

  // Browser notification for pending tasks
  useEffect(() => {
    if (!("Notification" in window)) return;

    if (tasks.some((t) => !t.done)) {
      Notification.requestPermission();
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const allCompleted = tasks.length > 0 && tasks.every((t) => t.done);

  return (
    <div className="todo-container">
      {/* INPUT BOX */}
      <div className="task-box">
        <input
          type="text"
          placeholder="Add a task for today..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* TODO LIST */}
      <ul className="todo-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.done ? "done" : ""}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(index)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(index)}>✕</button>
          </li>
        ))}
      </ul>

      {/* CONGRATS MESSAGE */}
      {allCompleted && (
        <div className="congrats">
          🎉 Amazing! You completed all your tasks 🌸
        </div>
      )}
    </div>
  );
};

export default TodoList;
