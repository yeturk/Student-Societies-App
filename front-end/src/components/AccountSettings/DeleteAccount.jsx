import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Section from './Section';
import FormGroup from './FormGroup';
import { useAuth } from '../../context/AuthContext';
import { endpoints } from '../../services/api';

const DeleteAccount = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!isConfirmed) {
      setError('Please confirm that you want to delete your account');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // Önce kullanıcının takip ettiği topluluklar ve varsa lider olduğu topluluk için kontroller yapılabilir
      if (user.role === 'society-leader') {
        setError('Society leaders cannot delete their accounts. Please contact an administrator.');
        return;
      }

      // API'ye integer ID gönderiyoruz
      await endpoints.deleteStudent(parseInt(user.id));
      
      // Başarılı silme işleminden sonra
      logout();
      navigate('/login', { 
        state: { message: 'Your account has been successfully deleted.' }
      });
    } catch (err) {
      console.error('Delete account error:', err);
      setError(err.response?.data?.message || 'An error occurred while deleting your account');
    } finally {
      setIsLoading(false);
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
          <div className="account-settings-alert" style={{ 
            backgroundColor: '#fee2e2', 
            borderColor: '#f87171', 
            color: '#b91c1c', 
            marginBottom: '20px',
            padding: '12px',
            borderRadius: '6px'
          }}>
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
              disabled={isLoading}
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
            cursor: isLoading ? 'not-allowed' : 'pointer',
            marginTop: '20px',
            opacity: isLoading ? 0.7 : 1,
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting Account...' : 'Delete Account'}
        </button>
      </div>
    </Section>
  );
};

export default DeleteAccount;