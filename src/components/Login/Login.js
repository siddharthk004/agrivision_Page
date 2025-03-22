import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        "https://spring-boot-agrivision-1.onrender.com/api/v1/auth/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      //console.log("Login Response:", data); // ✅ Debugging

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        //console.log("Token stored:", localStorage.getItem("token"));

        window.dispatchEvent(new Event("loginStatusChanged")); // 🔹 Forces Header.js to update
        navigate("/");
      } else {
        setError(data.message || "Login failed. Try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary">
            Log In
          </button>
        </form>
        <br />
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="p-4 signup-link">
            Sign Up
          </Link>
        </p>
        <p>
          Login As Admin?{" "}
          <Link to="/AdminLogin" className="signup-link">
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
