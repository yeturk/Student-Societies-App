import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { eventsApi } from "../services/api";
import "../styles/schedule.css";

function SchedulePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data } = await eventsApi.getAll();
            setEvents(data);
            setError(null);
        } catch (err) {
            setError(`Failed to load events: ${err.message}`);
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };

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
            <div className="events-list">
                {events.length === 0 ? (
                    <p>No events found</p>
                ) : (
                    events.map((event, index) => (
                        <div key={index} className="event-card">
                            <h3>{event.title}</h3>
                            <p>Date: {new Date(event.startDate).toLocaleDateString()}</p>
                            <p>Time: {event.startTime} - {event.endTime}</p>
                            {event.description && <p>Description: {event.description}</p>}
                            {event.location && <p>Location: {event.location}</p>}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default SchedulePage;