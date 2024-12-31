import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import '../styles/image-slider.css';

function ImageSlider({ events, isUpcoming }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextImage, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleImageClick = (event) => {
    // Schedule sayfasına yönlendir ve popup'ı göster
    navigate('/schedule', { 
      state: { 
        selectedEvent: event,
        showEventPopup: true 
      } 
    });
  };

  return (
    <div className="slider-container">
      <button onClick={prevImage} className="btn left">
        <IoIosArrowBack />
      </button>
      
      {events.length > 0 && (
        <div 
          className="image-container"
          onClick={() => handleImageClick(events[currentIndex])}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src={events[currentIndex].imageUrl} 
            className="img" 
            alt={events[currentIndex].title} 
          />
          <div className="event-info-overlay">
            <h3>{events[currentIndex].title}</h3>
            <p>{new Date(events[currentIndex].startDate).toLocaleDateString()}</p>
          </div>
        </div>
      )}

      <button onClick={nextImage} className="btn right">
        <IoIosArrowForward />
      </button>
      
      <div className="dots">
        {events.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;