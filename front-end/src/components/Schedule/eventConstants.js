// eventConstants.jsx
export const EVENT_TYPES = {
    conference: {
        className: 'conference-event',
        color: '#2C3E50' // Koyu Lacivert
    },
    sportif: {
        className: 'sportif-event',
        color: '#2980B9' // Koyu Mavi
    },
    panel: {
        className: 'panel-event',
        color: '#8E44AD' // Koyu Mor
    },
    seminar: {
        className: 'seminar-event',
        color: '#34495E' // Lacivert-Gri
    },
    trip: {
        className: 'trip-event',
        color: '#16A085' // Koyu Turkuaz
    },
    stand: {
        className: 'stand-event',
        color: '#2C82C9' // Orta Mavi
    },
    meeting: {
        className: 'meeting-event',
        color: '#3498DB' // Ana Mavi
    },
    cultural: {
        className: 'cultural-event',
        color: '#1ABC9C' // Turkuaz
    },
    'social-responsibility': {
        className: 'social-responsibility-event',
        color: '#27AE60' // Koyu Yeşil
    },
    default: {
        className: 'default-event',
        color: '#577F92' // Gri-Mavi
    }
};

// Fonksiyon ismi değişti: getEventTypeByTitle -> getEventTypeConfig
export const getEventTypeConfig = (type) => {
    // type değeri direkt olarak EVENT_TYPES'dan alınacak
    return EVENT_TYPES[type] || EVENT_TYPES.default;
};