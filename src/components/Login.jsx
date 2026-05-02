import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // save user for welcome message
    localStorage.setItem("user", username);

    // redirect to autoparts page
    navigate("/");
  };

  return (
    <div className="login-overlay">
      <div className="login-container">

        {/* HEADER */}
        <div className="login-header">
          <h2>{isSignup ? "Create Account" : "Login"}</h2>
        </div>

        {/* FORM */}
        <form className="login-form" onSubmit={handleSubmit}>

          {/* Username (needed for welcome message) */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit" className="submit-btn-type">
            {isSignup ? "Sign Up" : "Login"}
          </button>

        </form>

        {/* TOGGLE */}
        <p className="toggle text">
          {isSignup
            ? "Already have an account? "
            : "New to Autoparts.co? "}

          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login here" : "Create one"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;