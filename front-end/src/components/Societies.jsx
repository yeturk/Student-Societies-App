import React from 'react';
import Society from './Society';
import "../styles/societies.css";
import { useNavigate } from 'react-router-dom';

function Societies({ title, societies }) {
    const navigate = useNavigate();

    const handleSeeAllClick = () => {
        if (title === "Followed Societies") {
            navigate('/societies?followed=true');
        } else if (title === "Popular Societies") {
            navigate('/societies');
        }
    };

    return (
        <div className='societies-section'>
            <div className='societies-title'>{title}</div>
            <div className='societies-container'>
                <div 
                    className='see-all-btn' 
                    onClick={handleSeeAllClick}
                    style={{ cursor: 'pointer' }}
                >
                    <span>See All</span>
                </div>
                <div className='societies-list'>
                    {societies.map((society) => (
                        <Society 
                            key={society.id} 
                            id={society.id}
                            name={society.name} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Societies;