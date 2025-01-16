import React, { useState } from "react";
import { sendPasswordToEmail } from "../services/api"; // Adjust import path as needed
import "../styles/password-email-sender.css";

const PasswordEmailSender = () => {
  const [email, setEmail] = useState(""); // Email state
  const [message, setMessage] = useState(""); // Status message state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSendPassword = async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Send password reset email
      await sendPasswordToEmail(email);

      // Success message
      setMessage("A password reset link has been sent to your email address!");
      setEmail(""); // Clear email input
    } catch (error) {
      // Error handling
      setMessage(error.message || "Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="password-email-sender">
      <h2>Password Reset</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
        className="email-input"
      />
      <button 
        onClick={handleSendPassword} 
        disabled={isLoading}
        className="send-button"
      >
        {isLoading ? "Sending..." : "Send Password Reset Link"}
      </button>
      {message && (
        <p className={`message ${message.includes('!') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PasswordEmailSender;