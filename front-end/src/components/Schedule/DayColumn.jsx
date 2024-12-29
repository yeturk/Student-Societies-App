// DayColumn.js
import React from "react";
import { EventItem } from "./EventItem";
import useEvents from "./useEvents";

export const DayColumn = ({ day, onEventClick }) => {
    const { getDayEvents } = useEvents();
    const dayEvents = getDayEvents(day);

    return (
        <div className="day-column">
            <div className="day-header">{day}</div>
            <div className="events-container">
                {dayEvents.map((event) => (
                    <EventItem 
                        key={event.id} 
                        {...event} 
                        onClick={() => onEventClick(event)}
                    />
                ))}
            </div>
        </div>
    );
};