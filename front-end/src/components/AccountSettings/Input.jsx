import React from 'react';

const Input = ({ type = 'text', defaultValue, ...props }) => {
  return (
    <input 
      type={type}
      className="account-settings-form-input"
      defaultValue={defaultValue}
      {...props}
    />
  );
};

export default Input;