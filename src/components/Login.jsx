import React, { useState } from 'react';
import './login.css';

const Login = ({ setShowLogin }) => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="login-overlay">
      <div className="login-container">
        <div className="login-header">
          <h2>{isSignup ? "Create Account" : "Login"}</h2>
          <button className="close-btn" onClick={() => setShowLogin(false)}>&times;</button>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          {isSignup && <input type="text" placeholder="Full Name" required />}
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="submit-btn-type">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="toggle text">
          {/* Fixed the variable name from isSign to isSignup below */}
          {isSignup ? "Already have an account? " : "New to Autoparts.co? "}
          <span 
            style={{ cursor: 'pointer', color: 'blue' }} 
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