import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../../Axios";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await Axios().post("/admin/login", { username, password });
      if (response.status === 200) {
        localStorage.setItem("tok", "admin");
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => navigate("/admin/home"), 2000);
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="d-flex">
              Username <h6 className="text-danger">*</h6>
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="d-flex">
              Password<h6 className="text-danger">*</h6>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : "Log in"}
          </button>
        </form>

        <p>
          Login As User?{" "}
          <Link to="/login" className="signup-link">
            User Login
          </Link>
        </p>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default LoginPage;
