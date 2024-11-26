import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope  } from "react-icons/fa";
import { IoMdBusiness } from "react-icons/io";
import "../styles/login-register-page.css";

function LoginRegisterPage() {
  const [isLoginActive, setIsLoginActive] = useState(false);

  return (
    <div className="auth-container">
      <div className={`auth-wrapper ${isLoginActive ? 'active' : ''}`}>
        <div className={`auth-form-box login ${isLoginActive ? '' : 'active'}`}>
          <form action="">
            <h1>Login</h1>
            <div className="auth-input-box">
              <input type="email" placeholder="Email" required />
              <FaUser />
            </div>
            <div className="auth-input-box">
              <input type="password" placeholder="Password" required />
              <FaLock />
            </div>

            <div className="auth-forgot-link">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="auth-btn">
              Login
            </button>
          </form>
        </div>

        <div className={`auth-form-box register ${isLoginActive ? 'hidden' : ''}`}>
          <form action="">
            <h1>Registration</h1>
            <div className="auth-input-box">
              <input type="text" placeholder="Name" required />
              <FaUser />
            </div>

            <div className="auth-input-box" id="dprtmnt">
              <select required>
                <option value="" disabled selected>
                  Department
                </option>
                <option value="computer-science">Computer Science</option>
                <option value="electrical-engineering">Electrical Engineering</option>
                <option value="mechanical-engineering">Mechanical Engineering</option>
                <option value="business">Business</option>
                <option value="psychology">Psychology</option>
              </select>
              <IoMdBusiness />
            </div>

            <div className="auth-input-box">
              <input type="email" placeholder="Email" required />
              <FaEnvelope />
            </div>

            <div className="auth-input-box">
              <input type="password" placeholder="Password" required />
              <FaLock />
            </div>

            <div className="auth-input-box">
              <input type="password" placeholder="Confirm Password" required />
              <FaLock />
            </div>

            <button type="submit" className="auth-btn">
              Register
            </button>
          </form>
        </div>

        <div className="auth-toggle-box">
          <div className="auth-toggle-panel toggle-left">
            <h1>Hello, Welcome</h1>
            <p>Don't have an account?</p>
            <button className="auth-btn auth-toggle-btn" onClick={() => setIsLoginActive(!isLoginActive)}>
              Register
            </button>
          </div>

          <div className="auth-toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="auth-btn auth-toggle-btn" onClick={() => setIsLoginActive(!isLoginActive)}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegisterPage;