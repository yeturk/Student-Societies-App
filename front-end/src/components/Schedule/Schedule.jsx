// Schedule.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TimeColumn } from "./TimeColumn";
import { DayColumn } from "./DayColumn";
import { EventPopup } from "./EventPopup";
import useEvents from "./useEvents";
import "../../styles/schedule-page.css";

// Haftanın günlerini tanımla
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Schedule = () => {
    const { events, loading, error, fetchEvents } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // Homepage'den gelen event bilgisini kontrol et
        if (location.state?.selectedEvent && location.state?.showEventPopup) {
            setSelectedEvent(location.state.selectedEvent);
        }
    }, [location]);

    if (loading) {
        return <div className="loading-spinner">Loading events...</div>;
    }

    if (error) {
        return (
            <div className="schedule-container">
                <p className="error-message">{error}</p>
                <button onClick={fetchEvents} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="schedule-container">
            <h1>Schedule</h1>
            <div className="schedule-grid">
                <TimeColumn />
                {DAYS.map(day => (
                    <DayColumn 
                        key={day} 
                        day={day}
                        onEventClick={setSelectedEvent}
                    />
                ))}
            </div>
            {selectedEvent && (
                <EventPopup 
                    event={selectedEvent} 
                    onClose={() => setSelectedEvent(null)} 
                />
            )}
        </div>
    );
};

export default Schedule;