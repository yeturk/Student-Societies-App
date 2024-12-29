// EventItem.jsx
import React from "react";
import { EVENT_TYPES } from './eventConstants';

const calculatePosition = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const startHour = 9;
    const totalMinutes = ((hours - startHour) * 60) + minutes;
    return totalMinutes;
};

const calculateHeight = (startTime, endTime) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const durationInMinutes = ((endHours - startHours) * 60) + (endMinutes - startMinutes);
    return durationInMinutes;
};

export const EventItem = ({ title, startTime, endTime, type, onClick }) => {
    // type direkt olarak className olarak kullanılacak
    const eventClass = type || 'default-event';

    const top = calculatePosition(startTime);
    const height = calculateHeight(startTime, endTime);

    return (
        <div 
            className={`event ${eventClass}`}
            style={{ 
                top: `${top}px`,
                height: `${height}px`,
                minHeight: '30px'
            }}
            onClick={onClick}
        >
            <span>{startTime} - {endTime}</span>
            <span>{title}</span>
        </div>
    );
};

export default EventItem;