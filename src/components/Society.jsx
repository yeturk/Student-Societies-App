import React from 'react';
import '../styles/society.css';

function Society({ name }) {
  return (
    <div className='society-item'>
      {name}
    </div>
  );
}

export default Society;