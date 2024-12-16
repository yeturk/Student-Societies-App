import React from 'react';
import '../styles/event.css';

function Event({ date, name, society }) {
  return (
    <div className="event-card">
      <div className="event-date">
        <span className="event-day">{date.day}</span>
        <span className="event-month">{date.month}</span>
      </div>
      <div className="event-info">
        <div className="event-name">{name}</div>
        <div className="event-society">{society}</div>
      </div>
    </div>
  );
}

export default Event;