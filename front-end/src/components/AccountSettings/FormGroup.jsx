import React from 'react';

const FormGroup = ({ label, children }) => {
  return (
    <div className="account-settings-form-group">
      <label className="account-settings-form-label">{label}</label>
      {children}
    </div>
  );
};

export default FormGroup;