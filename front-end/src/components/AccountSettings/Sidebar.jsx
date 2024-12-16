import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'password', label: 'Change password' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'delete', label: 'Delete Account', isDanger: true }
  ];

  return (
    <div className="account-settings-sidebar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`
            account-settings-sidebar-item 
            ${activeTab === tab.id ? 'account-settings-sidebar-item--active' : ''}
            ${tab.isDanger ? 'account-settings-sidebar-item--delete' : ''}
          `}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Sidebar;