import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import Calendar from "./Calendar";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Quotes
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

  // Random images (fade effect)
  const [imgSeed] = useState(Math.random());

  const handleSignIn = () => {
    if (username.trim() && password.trim()) {
      setLoggedInUser(username);
      setPassword("");
    }
  };

  return (
    <div className="layout">
      {/* HEADER */}
      <header className="header">
        <h2>AuraPlan 🌸</h2>

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
            Welcome, {loggedInUser} 🌿
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div className="content">
        {/* LEFT SIDEBAR */}
        <aside className="left">
          <div className="image-row">
            <img
              src={`https://picsum.photos/300/200?random=${imgSeed}`}
              alt="aesthetic"
              className="fade-img"
            />
            <img
              src={`https://picsum.photos/300/200?random=${imgSeed + 1}`}
              alt="aesthetic"
              className="fade-img"
            />
          </div>

          <div className="stories">
            <h3>Daily Inspiration</h3>
            <p>
              <strong>APJ Abdul Kalam:</strong> Sold newspapers as a child and
              became the President of India 🚀
            </p>
            <p>
              <strong>Elon Musk:</strong> Faced multiple failures before Tesla
              and SpaceX succeeded 🔥
            </p>
            <p>
              <strong>Marie Curie:</strong> First woman to win a Nobel Prize 🧪
            </p>
          </div>
        </aside>

        {/* CENTER */}
        <main className="center">
          <h1>Welcome back 🌿</h1>
          <h3 className="quote">{quotes[quoteIndex]}</h3>

          {loggedInUser ? (
            <TodoList username={loggedInUser} />
          ) : (
            <p className="signin-msg">
              Please sign in to start planning your day ✨
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
