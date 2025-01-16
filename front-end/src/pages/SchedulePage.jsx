import React, { useState, useEffect } from "react";
import "../styles/schedule-page.css";
import { endpoints } from '../services/api';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = Array.from({ length: 13 }, (_, i) => i + 9); // 9:00 to 21:00

function SchedulePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    // Tarihin bugünden sonraki 7 gün içinde olup olmadığını kontrol et
    const isWithinNextWeek = (dateString) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
    
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
    
        const eventDate = new Date(dateString);
        eventDate.setHours(0, 0, 0, 0);
    
        console.log('Date check:', {
            eventDateString: dateString,
            currentDate: currentDate.toISOString(),
            nextWeek: nextWeek.toISOString(),
            eventDate: eventDate.toISOString(),
            isWithin: eventDate >= currentDate && eventDate <= nextWeek
        });
    
        return eventDate >= currentDate && eventDate <= nextWeek;
    };

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await endpoints.getEvents();
            console.log('All events:', response.data); 
    
            // Şu anki tarihi yazdıralım
            const now = new Date();
            console.log('Current date:', now.toISOString());
    
            // Önümüzdeki 7 gün içindeki etkinlikleri filtrele
            const nextWeekEvents = response.data.filter(event => {
                const isWithin = isWithinNextWeek(event.startDate);
                console.log(`Event ${event.title} on ${event.startDate} is within next week: ${isWithin}`);
                return isWithin;
            });
    
            console.log('Filtered events:', nextWeekEvents);
            setEvents(nextWeekEvents);
        } catch (err) {
            console.error("Error fetching events:", err);
            setError("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        return timeString.substring(0, 5);
    };

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    const calculateEventPosition = (timeString) => {
        const [hours, minutes] = timeString.split(':').map(Number);
        const startHour = 9;
        const pixelsPerHour = 60;
        const pixelsPerMinute = 1;
        
        const minutesSinceStart = (hours - startHour) * 60 + minutes;
        return `${minutesSinceStart * pixelsPerMinute}px`;
    };

    const calculateEventHeight = (startTime, endTime) => {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        
        const durationMinutes = (endHours - startHours) * 60 + (endMinutes - startMinutes);
        return `${Math.max(durationMinutes, 30)}px`;
    };

    const renderEvents = (day) => {
        return events
            .filter(event => getDayOfWeek(event.startDate) === day)
            .map((event, index) => {
                const startTime = formatTime(event.startTime);
                const endTime = formatTime(event.endTime);
                const eventType = event.type?.toLowerCase() || 'default';

                return (
                    <div
                        key={event.id || index}
                        className={`event ${eventType}-event`}
                        style={{
                            top: calculateEventPosition(startTime),
                            height: calculateEventHeight(startTime, endTime)
                        }}
                    >
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">
                            {startTime} - {endTime}
                        </div>
                        <div className="event-location">{event.location}</div>
                    </div>
                );
            });
    };

    if (loading) return <div className="loading">Loading events...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="schedule-container">
            <h1>Weekly Schedule</h1>
            <div className="schedule-grid">
                <div className="time-column">
                    {HOURS.map(hour => (
                        <div key={hour} className="time-slot">
                            {`${hour.toString().padStart(2, '0')}:00`}
                        </div>
                    ))}
                </div>
                
                {DAYS.map(day => (
                    <div key={day} className="day-column">
                        <div className="day-header">{day}</div>
                        <div className="events-container">
                            {renderEvents(day)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SchedulePage;