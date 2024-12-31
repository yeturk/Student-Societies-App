// SchedulePage.jsx
import React from "react";
import { useState, useEffect } from "react";
import "../styles/schedule-page.css";
import { endpoints } from '../services/api';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = Array.from({ length: 10 }, (_, i) => i + 9); // 9:00 to 18:00

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
            const { data } = await endpoints.getEvents();
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
            <h1>Schedule Template</h1>
            <div className="schedule-grid">
                <div className="time-column">
                    {HOURS.map(hour => (
                        <div key={hour} className="time-slot">
                            {`${hour}:00`}
                        </div>
                    ))}
                </div>
                
                {DAYS.map(day => (
                    <div key={day} className="day-column">
                        <div className="day-header">{day}</div>
                        <div className="events-container">
                            {/* Monday Events */}
                            {day === 'Monday' && (
                                <>
                                    <div className="event abs-circuit" style={{ top: '65px', height: '85px' }}>
                                        <span>09:30 - 10:30</span>
                                        <span>Abs Circuit</span>
                                    </div>
                                    <div className="event rowing-workout" style={{ top: '135px', height: '85px' }}>
                                        <span>11:00 - 12:30</span>
                                        <span>Rowing Workout</span>
                                    </div>
                                    <div className="event yoga-level-1" style={{ top: '305px', height: '85px' }}>
                                        <span>14:00 - 15:15</span>
                                        <span>Yoga Level 1</span>
                                    </div>
                                </>
                            )}
                            {/* Tuesday Events */}
                            {day === 'Tuesday' && (
                                <>
                                    <div className="event rowing-workout" style={{ top: '65px', height: '85px' }}>
                                        <span>10:00 - 11:00</span>
                                        <span>Rowing Workout</span>
                                    </div>
                                    <div className="event restorative-yoga" style={{ top: '135px', height: '85px' }}>
                                        <span>11:30 - 13:00</span>
                                        <span>Restorative Yoga</span>
                                    </div>
                                    <div className="event abs-circuit" style={{ top: '275px', height: '85px' }}>
                                        <span>13:30 - 15:00</span>
                                        <span>Abs Circuit</span>
                                    </div>
                                    <div className="event yoga-level-1" style={{ top: '395px', height: '85px' }}>
                                        <span>15:00 - 16:45</span>
                                        <span>Yoga Level 1</span>
                                    </div>
                                </>
                            )}
                            {/* Wednesday Events */}
                            {day === 'Wednesday' && (
                                <>
                                    <div className="event restorative-yoga" style={{ top: '5px', height: '85px' }}>
                                        <span>09:00 - 10:15</span>
                                        <span>Restorative Yoga</span>
                                    </div>
                                    <div className="event yoga-level-1" style={{ top: '135px', height: '85px' }}>
                                        <span>10:45 - 11:45</span>
                                        <span>Yoga Level 1</span>
                                    </div>
                                    <div className="event rowing-workout" style={{ top: '185px', height: '85px' }}>
                                        <span>12:00 - 13:45</span>
                                        <span>Rowing Workout</span>
                                    </div>
                                    <div className="event yoga-level-1" style={{ top: '275px', height: '85px' }}>
                                        <span>13:45 - 15:00</span>
                                        <span>Yoga Level 1</span>
                                    </div>
                                </>
                            )}
                            {/* Thursday Events */}
                            {day === 'Thursday' && (
                                <>
                                    <div className="event abs-circuit" style={{ top: '65px', height: '85px' }}>
                                        <span>09:30 - 10:30</span>
                                        <span>Abs Circuit</span>
                                    </div>
                                    <div className="event restorative-yoga" style={{ top: '185px', height: '85px' }}>
                                        <span>12:00 - 13:45</span>
                                        <span>Restorative Yoga</span>
                                    </div>
                                    <div className="event abs-circuit" style={{ top: '395px', height: '85px' }}>
                                        <span>15:30 - 16:30</span>
                                        <span>Abs Circuit</span>
                                    </div>
                                    <div className="event rowing-workout" style={{ top: '485px', height: '85px' }}>
                                        <span>17:00 - 18:30</span>
                                        <span>Rowing Workout</span>
                                    </div>
                                </>
                            )}
                            {/* Friday Events */}
                            {day === 'Friday' && (
                                <>
                                    <div className="event rowing-workout" style={{ top: '65px', height: '85px' }}>
                                        <span>10:00 - 11:00</span>
                                        <span>Rowing Workout</span>
                                    </div>
                                    <div className="event abs-circuit" style={{ top: '215px', height: '85px' }}>
                                        <span>12:30 - 14:00</span>
                                        <span>Abs Circuit</span>
                                    </div>
                                    <div className="event yoga-level-1" style={{ top: '395px', height: '85px' }}>
                                        <span>15:45 - 16:45</span>
                                        <span>Yoga Level 1</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SchedulePage;