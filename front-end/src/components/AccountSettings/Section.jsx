import React from 'react';

const Section = ({ title, children }) => {
  return (
    <div className="account-settings-section">
      {title && <h6 className="account-settings-section-title">{title}</h6>}
      {children}
    </div>
  );
};

export default Section;