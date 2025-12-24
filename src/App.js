import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import Calendar from "./Calendar";

function App() {
  // AUTH STATES
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  // QUOTES (rotate every 5s)
  const quotes = [
    "Small steps every day 🌱",
    "You are doing better than you think 💫",
    "Focus on progress, not perfection ✨",
    "Your future self will thank you 💙",
    "Consistency beats motivation 🌸",
    "Healing is also productivity 🌿"
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // RANDOM IMAGES (change on refresh)
  const [imgSeed] = useState(Math.random());

  const handleSignIn = () => {
    if (username.trim() && password.trim()) {
      setLoggedInUser(username);
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="layout">
      {/* HEADER */}
      <header className="header">
        <h2 className="logo">AuraPlan 🌸</h2>

        {!loggedInUser ? (
          <div className="signin-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        ) : (
          <div className="welcome-text">
            Welcome, <strong>{loggedInUser}</strong> 🌿
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div className="content">
        {/* LEFT SIDEBAR */}
        <aside className="left">
          <div className="image-stack">
            <img
              src={`https://picsum.photos/300/200?random=${imgSeed}`}
              alt="motivation"
              className="side-img fade"
            />
            <img
              src={`https://picsum.photos/300/200?random=${imgSeed + 1}`}
              alt="study"
              className="side-img fade"
            />
          </div>

          <div className="stories">
            <h3>Motivational Story</h3>
            <p>
              <strong>APJ Abdul Kalam:</strong>  
              Failed multiple times, lived humbly, and became the President of India.
              His life proves dreams don’t need privilege — only persistence.
            </p>
          </div>
        </aside>

        {/* CENTER BAR */}
        <main className="center">
          <h1>Stay Consistent 🌿</h1>
          <h3 className="quote fade">{quotes[quoteIndex]}</h3>

          {/* TODO LIST APPEARS ONLY AFTER SIGN-IN */}
          {loggedInUser ? (
            <TodoList username={loggedInUser} />
          ) : (
            <p className="signin-hint">
              Sign in to view and manage your tasks ✨
            </p>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="right">
          <Calendar />
        </aside>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        © 2025 AuraPlan. All rights reserved. Privacy is maintained.
      </footer>
    </div>
  );
}

export default App;
