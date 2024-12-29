import React from "react";

export const EventPopup = ({ event, onClose }) => {
    if (!event) return null;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-content" onClick={e => e.stopPropagation()}>
                <button className="close-popup" onClick={onClose}>×</button>
                
                <div className="popup-image">
                    <img 
                        src={event.image || "https://www.akustikofistasarim.com/wp-content/uploads/2022/09/konferans-salonu-ses-yalitimi-malzemeleri.jpg"} 
                        alt={event.title} 
                    />
                </div>

                <div className="popup-header">
                    <span className="event-type">
                        {event.type || 'Event'}
                    </span>
                </div>

                <div className="popup-body">
                    <h2 className="event-title">{event.title}</h2>
                    
                    <div className="event-meta">
                        <div className="meta-item">
                            <span className="meta-icon">📅</span>
                            <span className="meta-text">{formatDate(event.startDate)}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">⏰</span>
                            <span className="meta-text">{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-icon">📍</span>
                            <span className="meta-text">{event.location}</span>
                        </div>
                        {event.guests && (
                            <div className="meta-item">
                                <span className="meta-icon">👥</span>
                                <span className="meta-text">{event.guests}</span>
                            </div>
                        )}
                    </div>

                    <div className="event-description">
                        <h3>About Event</h3>
                        <p>{event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};