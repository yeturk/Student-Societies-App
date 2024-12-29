export const getDayEvents = (day) => {
    const events = {
        'Monday': [
            { title: 'Abs Circuit', startTime: '09:30', endTime: '10:30', type: 'abs-circuit' },
            { title: 'Rowing Workout', startTime: '11:00', endTime: '12:30', type: 'rowing-workout' },
            { title: 'Yoga Level 1', startTime: '14:00', endTime: '15:15', type: 'yoga-level-1' }
        ],
        'Tuesday': [
            { title: 'Rowing Workout', startTime: '10:00', endTime: '11:00', type: 'rowing-workout' },
            { title: 'Restorative Yoga', startTime: '11:30', endTime: '13:00', type: 'restorative-yoga' },
            { title: 'Abs Circuit', startTime: '13:30', endTime: '15:00', type: 'abs-circuit' },
            { title: 'Yoga Level 1', startTime: '15:00', endTime: '16:45', type: 'yoga-level-1' }
        ],
        'Wednesday': [
            { title: 'Restorative Yoga', startTime: '09:00', endTime: '10:15', type: 'restorative-yoga' },
            { title: 'Yoga Level 1', startTime: '10:45', endTime: '11:45', type: 'yoga-level-1' },
            { title: 'Rowing Workout', startTime: '12:00', endTime: '13:45', type: 'rowing-workout' },
            { title: 'Yoga Level 1', startTime: '13:45', endTime: '15:00', type: 'yoga-level-1' }
        ],
        'Thursday': [
            { title: 'Abs Circuit', startTime: '09:30', endTime: '10:30', type: 'abs-circuit' },
            { title: 'Restorative Yoga', startTime: '12:00', endTime: '13:45', type: 'restorative-yoga' },
            { title: 'Abs Circuit', startTime: '15:30', endTime: '16:30', type: 'abs-circuit' },
            { title: 'Rowing Workout', startTime: '17:00', endTime: '18:30', type: 'rowing-workout' }
        ],
        'Friday': [
            { title: 'Rowing Workout', startTime: '10:00', endTime: '11:00', type: 'rowing-workout' },
            { title: 'Abs Circuit', startTime: '12:30', endTime: '14:00', type: 'abs-circuit' },
            { title: 'Yoga Level 1', startTime: '15:45', endTime: '16:45', type: 'yoga-level-1' }
        ]
    };
    
    return events[day] || [];
};