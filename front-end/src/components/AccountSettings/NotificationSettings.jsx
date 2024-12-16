import React from 'react';

const NotificationSettings = () => {
  return (
    <div className="account-settings-section">
      <h6 className="account-settings-section-title">Activity</h6>
      <div className="account-settings-checkbox-group">
        <div className="account-settings-checkbox-item">
          <input 
            type="checkbox" 
            id="newSociety" 
            className="account-settings-checkbox"
            defaultChecked 
          />
          <label htmlFor="newSociety">
            Email me when a new society formed
          </label>
        </div>
        <div className="account-settings-checkbox-item">
          <input 
            type="checkbox" 
            id="societyEvent" 
            className="account-settings-checkbox"
            defaultChecked 
          />
          <label htmlFor="societyEvent">
            Email me when societies that I follow organize an event
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;