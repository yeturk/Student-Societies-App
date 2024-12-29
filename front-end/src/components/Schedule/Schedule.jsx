import React, { useState } from "react";
import { TimeColumn } from "./TimeColumn";
import { DayColumn } from "./DayColumn";
import { EventPopup } from "./EventPopup";
import useEvents from "./useEvents";
import "../../styles/schedule-page.css";

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const Schedule = () => {
    const { loading, error, fetchEvents } = useEvents();
    const [selectedEvent, setSelectedEvent] = useState(null);

    if (loading) {
        return (
            <div className="schedule-container">
                <div className="loading-spinner">Loading events...</div>
            </div>
        );
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
            <h1>Schedule Template</h1>
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