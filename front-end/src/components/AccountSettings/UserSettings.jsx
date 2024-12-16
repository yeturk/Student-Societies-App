import React, { useState } from 'react';
import Sidebar from './Sidebar';
import GeneralSettings from './GeneralSettings';
import PasswordSettings from './PasswordSettings';
import NotificationSettings from './NotificationSettings';
import DeleteAccount from './DeleteAccount';
import Button from './Button';
import '../../styles/profile-settings.css';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'password':
        return <PasswordSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'delete':
        return <DeleteAccount />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="account-settings-container">
      <h4 className="account-settings-header">Account settings</h4>
      <div className="account-settings-card">
        <div className="account-settings-content-wrapper">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="account-settings-main-content">
            {renderContent()}
          </div>
        </div>
      </div>
      <div className="account-settings-button-group">
        <Button type="primary">Save changes</Button>
        <Button type="secondary">Cancel</Button>
      </div>
    </div>
  );
};

export default AccountSettings;