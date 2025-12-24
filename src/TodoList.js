import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css";

export default function TodoList({ username }) {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  // STEP 3 — FETCH TASKS (HERE)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/tasks/${username}`)
      .then(res => setTasks(res.data));
  }, [username]);

  const addTask = () => {
    if (!text) return;
    axios
      .post(`http://localhost:5000/tasks/${username}`, {
        text,
        done: false
      })
      .then(res => setTasks(res.data));
    setText("");
  };

  const toggleTask = (i) => {
    axios
      .put(`http://localhost:5000/tasks/${username}/${i}`, {
        done: !tasks[i].done
      })
      .then(res => setTasks(res.data));
  };

  const deleteTask = (i) => {
    axios
      .delete(`http://localhost:5000/tasks/${username}/${i}`)
      .then(res => setTasks(res.data));
  };

  return (
    <div className="todo-container">
      <div className="task-box">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((t, i) => (
        <div key={i} className={t.done ? "done task" : "task"}>
          <input type="checkbox" checked={t.done} onChange={() => toggleTask(i)} />
          <span>{t.text}</span>
          <button onClick={() => deleteTask(i)}>✕</button>
        </div>
      ))}
    </div>
  );
}
