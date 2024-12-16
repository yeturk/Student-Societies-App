import React from 'react';

const Button = ({ type = 'secondary', onClick, children }) => {
  return (
    <button 
      className={`account-settings-btn account-settings-btn--${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;