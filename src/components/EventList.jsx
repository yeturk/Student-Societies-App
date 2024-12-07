import React from 'react';
import Event from './Event';
import '../styles/event-list.css';

function EventList() {
  const events = [
    { id: 1, date: { day: 10, month: 'NOV' }, name: 'Event Name', society: 'Society Name' },
    { id: 2, date: { day: 11, month: 'NOV' }, name: 'Event Name', society: 'Society Name' },
    { id: 3, date: { day: 12, month: 'NOV' }, name: 'Event Name', society: 'Society Name' },
    { id: 4, date: { day: 13, month: 'NOV' }, name: 'Event Name', society: 'Society Name' },
    { id: 5, date: { day: 14, month: 'NOV' }, name: 'Event Name', society: 'Society Name' }
  ];

  return (
    <div className="event-list-container">
      <div className="event-list-header">
        <span>See All</span>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <Event
            key={event.id}
            date={event.date}
            name={event.name}
            society={event.society}
          />
        ))}
      </div>
    </div>
  );
}

export default EventList;