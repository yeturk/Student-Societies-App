// useEvents.js
import { useState, useEffect } from "react";
import { endpoints } from '../../services/api';

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [eventsGroupedByDay, setEventsGroupedByDay] = useState({});

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const { data } = await endpoints.getEvents();
            setEvents(data);
            
            const groupedEvents = data.reduce((acc, event) => {
                const day = new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long' });
                if (!acc[day]) {
                    acc[day] = [];
                }
                
                // Event tipini belirle
                const eventType = event.type ? `${event.type}-event` : 'default-event';
                
                const formattedEvent = {
                    id: event.id,
                    title: event.title,
                    startTime: event.startTime,
                    endTime: event.endTime,
                    type: eventType, // Doğrudan CSS class adını kullan
                    description: event.description,
                    location: event.location,
                    guests: event.guests || 'All are welcome',
                    startDate: event.startDate,
                    endDate: event.endDate,
                    societyId: event.societyId
                };
                
                acc[day].push(formattedEvent);
                return acc;
            }, {});
            
            setEventsGroupedByDay(groupedEvents);
            setError(null);
        } catch (err) {
            setError(`Failed to load events: ${err.message}`);
            console.error("Error fetching events:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const getDayEvents = (day) => {
        return eventsGroupedByDay[day] || [];
    };

    return { events, loading, error, fetchEvents, getDayEvents };
};

export default useEvents;