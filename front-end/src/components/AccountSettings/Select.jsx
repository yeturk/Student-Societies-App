import React from 'react';

const Select = ({ options, defaultValue, ...props }) => {
  return (
    <select 
      className="account-settings-form-select"
      defaultValue={defaultValue}
      {...props}
    >
      {options.map(option => (
        <option key={option.value || option} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
};

export default Select;