import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/society.css';

function Society({ id, name }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/societies/${id}`);
  };

  return (
    <div 
      className='society-item'
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      {name}
    </div>
  );
}

export default Society;