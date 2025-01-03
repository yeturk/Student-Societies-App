import axios from 'axios';

// Event API (8080 in prod, 4000 in dev)
const eventApi = axios.create({
    baseURL: import.meta.env.VITE_EVENT_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Main API for Student and Community (8081 in prod, 4000 in dev)
const mainApi = axios.create({
    baseURL: import.meta.env.VITE_MAIN_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Error handling interceptor
const setupErrorHandling = (api) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('API Error:', error.response?.data || error.message);
            return Promise.reject(error);
        }
    );
};

setupErrorHandling(eventApi);
setupErrorHandling(mainApi);

// Development paths for json-server
const DEV_PATHS = {
    events: '/events',
    societies: '/societies',
    students: '/users'
};

// Production paths based on Swagger
const PROD_PATHS = {
    events: {
        list: '/list',
        get: '/get',
        getById: (id) => `/get/${id}`,
        getBySociety: (id) => `/getBySID/${id}`,
        getByDate: '/getByDate',
        save: '/save',
        delete: (id) => `/delete/${id}`
    },
    societies: {
        base: '/rest/api/community',
        list: '/rest/api/community/list',
        get: (id) => `/rest/api/community/list/${id}`,
        save: '/rest/api/community/save',
        update: (id) => `/rest/api/community/update/${id}`,
        delete: (id) => `/rest/api/community/delete/${id}`
    },
    students: {
        base: '/rest/api/student',
        list: '/rest/api/student/list',
        get: (id) => `/rest/api/student/list/${id}`,
        save: '/rest/api/student/save',
        update: (id) => `/rest/api/student/update/${id}`,
        delete: (id) => `/rest/api/student/delete/${id}`,
        login: '/rest/api/student/login',
        follow: (id) => `/rest/api/student/follow/${id}`
    }
};

const isProd = import.meta.env.PROD;
const paths = isProd ? PROD_PATHS : DEV_PATHS;

const transformEventForBackend = (eventData) => ({
    title: eventData.title,
    description: eventData.description,
    location: eventData.location,
    startDate: eventData.startDate,
    startTime: {
        hour: parseInt(eventData.startTime.split(':')[0]),
        minute: parseInt(eventData.startTime.split(':')[1]),
        second: 0,
        nano: 0
    },
    endDate: eventData.endDate,
    endTime: {
        hour: parseInt(eventData.endTime.split(':')[0]),
        minute: parseInt(eventData.endTime.split(':')[1]),
        second: 0,
        nano: 0
    },
    societyID: parseInt(eventData.societyId),
    guest: eventData.guests,
    type: eventData.type
});

const transformEventFromBackend = (event) => ({
    id: event.id?.toString(),
    title: event.title,
    description: event.description,
    location: event.location,
    startDate: event.startDate,
    startTime: `${event.startTime.hour.toString().padStart(2, '0')}:${event.startTime.minute.toString().padStart(2, '0')}`,
    endDate: event.endDate,
    endTime: `${event.endTime.hour.toString().padStart(2, '0')}:${event.endTime.minute.toString().padStart(2, '0')}`,
    type: event.type,
    guests: event.guest,
    societyId: event.societyID?.toString()
});

const endpoints = {
    // Event endpoints
    getEvents: async () => {
        const response = await eventApi.get(isProd ? paths.events.list : paths.events);
        return {
            ...response,
            data: isProd ? response.data.map(transformEventFromBackend) : response.data
        };
    },
    getEvent: async (id) => {
        const response = await eventApi.get(isProd ? paths.events.getById(id) : `${paths.events}/${id}`);
        return {
            ...response,
            data: isProd ? transformEventFromBackend(response.data) : response.data
        };
    },
    getEventsBySociety: async (societyId) => {
        const response = await eventApi.get(isProd ? paths.events.getBySociety(societyId) : `${paths.events}?societyId=${societyId}`);
        return {
            ...response,
            data: isProd ? response.data.map(transformEventFromBackend) : response.data
        };
    },
    createEvent: async (data) => {
        const response = await eventApi.post(isProd ? paths.events.save : paths.events, 
            isProd ? transformEventForBackend(data) : data
        );
        return {
            ...response,
            data: isProd ? transformEventFromBackend(response.data) : response.data
        };
    },
    deleteEvent: (id) => eventApi.delete(isProd ? paths.events.delete(id) : `${paths.events}/${id}`),

    // Community endpoints
    getSocieties: () => mainApi.get(isProd ? paths.societies.list : paths.societies),
    getSociety: (id) => mainApi.get(isProd ? paths.societies.get(id) : `${paths.societies}/${id}`),
    createSociety: (data) => mainApi.post(isProd ? paths.societies.save : paths.societies, data),
    updateSociety: (id, data) => mainApi.put(isProd ? paths.societies.update(id) : `${paths.societies}/${id}`, data),
    deleteSociety: (id) => mainApi.delete(isProd ? paths.societies.delete(id) : `${paths.societies}/${id}`),

    // Student endpoints
    getStudents: () => mainApi.get(isProd ? paths.students.list : paths.students),
    getStudent: (id) => mainApi.get(isProd ? paths.students.get(id) : `${paths.students}/${id}`),
    updateStudent: (id, data) => mainApi.put(isProd ? paths.students.update(id) : `${paths.students}/${id}`, data),
    createStudent: (data) => mainApi.post(isProd ? paths.students.save : paths.students, data),
    deleteStudent: (id) => mainApi.delete(isProd ? paths.students.delete(id) : `${paths.students}/${id}`),
    loginStudent: (data) => mainApi.post(paths.students.login, data),
    followCommunity: (id) => mainApi.post(paths.students.follow(id)),

    // Email endpoints (production only)
    sendMultipleEmail: (data) => mainApi.post('/sendMultipleEmail', data)
};

export { endpoints };