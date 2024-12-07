import React from 'react';
import "../styles/homepage.css";
import Societies from '../components/Societies';
import ImageSlider from "../components/ImageSlider";
import EventList from '../components/EventList';

import img1 from "../assets/02.jpg";
import img2 from "../assets/03.jpg";

function Homepage() {
  const upcomingEvents = [img1, img2, img2];
  const pastEvents = [img1, img2, img2];

  return (
    <div className='homepage-container'>
      <div className='homepage-left homepage-section'>
        <div className='left-container'>
          <Societies title="Followed Societies" />
          <Societies title="Popular Societies" />
        </div>
      </div>
      <div className='homepage-middle homepage-section'>
        <div className='middle-container'>
          {upcomingEvents && upcomingEvents.length > 0 && (
            <div className='slider-section'>
              <h2 className='slider-title'>Upcoming Events</h2>
              <ImageSlider images={upcomingEvents} />
            </div>
          )}
          {pastEvents && pastEvents.length > 0 && (
            <div className='slider-section'>
              <h2 className='slider-title'>Past Events</h2>
              <ImageSlider images={pastEvents} />
            </div>
          )}
        </div>
      </div>
      <div className='homepage-right homepage-section'>
        <div className='right-container'>
          <EventList />
        </div>
      </div>
    </div>
  );
}

export default Homepage;