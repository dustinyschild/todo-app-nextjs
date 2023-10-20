import React, { useState } from "react";
import "../styles/Login.module.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // In a real-world application, you'd send these to a server for authentication.
    if (username === "admin" && password === "admin") {
      alert("Login successful");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default App;
