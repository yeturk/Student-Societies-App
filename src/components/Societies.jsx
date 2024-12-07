import React from 'react';
import Society from './Society';
import "../styles/societies.css";

function Societies({ title }) {
    const societies = ["Society 1", "Society 2", "Society 3", "Society 4", "Society 5"];
  
    return (
        <div className='societies-section'>
            <div className='societies-title'>{title}</div>
            <div className='societies-container'>
                <div className='see-all-btn'>
                    <span>See All</span>
                </div>
                <div className='societies-list'>
                    {societies.map((society, index) => (
                        <Society key={index} name={society} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Societies;