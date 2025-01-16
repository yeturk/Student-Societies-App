import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../services/api";
import "../styles/password-email-sender.css";

const PasswordEmailSender = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendPassword = async (e) => {
    e.preventDefault();

    if (!email.endsWith('@gtu.edu.tr')) {
      setMessage("Please enter a valid GTU email address (@gtu.edu.tr)");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await endpoints.sendPasswordToEmail(email);

      if (response.status === 200) {
        setMessage("Password reset instructions have been sent to your email!");
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      if (error.response?.status === 404) {
        setMessage("Email not found. Please check your email address.");
      } else {
        setMessage("An error occurred while sending the reset email. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Password Reset</h2>
      <p className="forgot-password-description">
        Enter your GTU email address and we'll send you instructions to reset your password.
      </p>
      <form onSubmit={handleSendPassword}>
        <input
          type="email"
          placeholder="Enter your GTU email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="forgot-password-input"
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="forgot-password-submit-btn"
        >
          {isLoading ? (
            <>
              <span className="forgot-password-spinner"></span>
              Sending...
            </>
          ) : (
            "Send Reset Instructions"
          )}
        </button>
        {message && (
          <div className={`forgot-password-message ${
            message.includes('sent') 
              ? 'forgot-password-message--success' 
              : 'forgot-password-message--error'
          }`}>
            {message}
          </div>
        )}
      </form>
      <button 
        onClick={() => navigate('/login')} 
        className="forgot-password-back-btn"
      >
        Back to Login
      </button>
    </div>
  );
};

export default PasswordEmailSender;