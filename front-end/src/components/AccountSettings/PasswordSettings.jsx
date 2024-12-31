// PasswordSettings.jsx
import React, { useState } from 'react';
import Section from './Section';
import FormGroup from './FormGroup';
import Input from './Input';
import { useAuth } from '../../context/AuthContext';
import { endpoints } from '../../services/api';

const PasswordSettings = () => {
  const { user } = useAuth();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Yeni şifrelerin eşleşip eşleşmediğini kontrol et
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      // Mevcut kullanıcıyı ve şifresini kontrol et
      const { data: currentUser } = await endpoints.getUser(user.id);

      if (currentUser.password !== passwords.currentPassword) {
        setError('Current password is incorrect');
        return;
      }

      // Şifreyi güncelle
      await endpoints.updateUser(user.id, {
        password: passwords.newPassword
      });

      setSuccess('Password updated successfully');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('An error occurred while updating password');
      console.error('Password update error:', err);
    }
  };

  return (
    <Section>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="account-settings-alert" style={{ backgroundColor: '#fee2e2', borderColor: '#f87171', color: '#b91c1c' }}>
            {error}
          </div>
        )}
        {success && (
          <div className="account-settings-alert" style={{ backgroundColor: '#dcfce7', borderColor: '#86efac', color: '#166534' }}>
            {success}
          </div>
        )}

        <FormGroup label="Current password">
          <Input 
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup label="New password">
          <Input 
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup label="Repeat new password">
          <Input 
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <button 
          type="submit"
          className="account-settings-btn account-settings-btn--primary"
          style={{ marginTop: '20px' }}
        >
          Update Password
        </button>
      </form>
    </Section>
  );
};

export default PasswordSettings;