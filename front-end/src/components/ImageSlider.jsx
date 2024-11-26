import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import '../styles/image-slider.css';

function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const slideInterval = setInterval(nextImage, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="slider-container">
      <button onClick={prevImage} className="btn left">
        <IoIosArrowBack />
      </button>
      {images.length > 0 && <img src={images[currentIndex]} className="img" alt="Slider" />}
      <button onClick={nextImage} className="btn right">
        <IoIosArrowForward />
      </button>
      
      <div className="dots">
        {images.map((_, idx) => (
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
