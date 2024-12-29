import React from "react";

const HOURS = Array.from({ length: 15 }, (_, i) => {
    const hour = i + 9; // 9'dan başlayıp 24'e kadar
    return `${hour.toString().padStart(2, '0')}:00`;
});

export const TimeColumn = () => (
    <div className="time-column">
        <div className="day-header"></div>
        <div className="time-slots">
            {HOURS.map((hour) => (
                <div key={hour} className="time-slot">
                    <span>{hour}</span>
                </div>
            ))}
        </div>
    </div>
);