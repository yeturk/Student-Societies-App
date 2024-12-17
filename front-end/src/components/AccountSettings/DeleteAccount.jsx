import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersApi } from '../../services/api';
import Section from './Section';
import FormGroup from './FormGroup';
import { useAuth } from '../../context/AuthContext';

const DeleteAccount = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!isConfirmed) {
      setError('Please confirm that you want to delete your account');
      return;
    }

    try {
      await usersApi.delete(user.id);
      logout();
      navigate('/login');
    } catch (err) {
      setError('An error occurred while deleting your account');
      console.error('Delete account error:', err);
    }
  };

  return (
    <Section>
      <div className="account-settings-section">
        <h3 className="account-settings-section-title" style={{ color: '#dc2626' }}>
          Delete Account
        </h3>
        <p style={{ color: '#4b5563', marginBottom: '20px' }}>
          Warning: This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
        </p>

        {error && (
          <div className="account-settings-alert" style={{ backgroundColor: '#fee2e2', borderColor: '#f87171', color: '#b91c1c', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        <FormGroup>
          <div className="account-settings-checkbox-item">
            <input
              type="checkbox"
              id="confirmDelete"
              className="account-settings-checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
            />
            <label htmlFor="confirmDelete" style={{ color: '#4b5563' }}>
              I confirm that I want to delete my account permanently
            </label>
          </div>
        </FormGroup>

        <button
          onClick={handleDelete}
          className="account-settings-btn"
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Delete Account
        </button>
      </div>
    </Section>
  );
};

export default DeleteAccount;