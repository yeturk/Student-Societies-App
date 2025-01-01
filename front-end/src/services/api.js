// src/services/api.js
import axios from 'axios';

// User ve Society işlemleri için API
const userApi = axios.create({
    baseURL: import.meta.env.VITE_USER_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Event işlemleri için API
const eventApi = axios.create({
    baseURL: import.meta.env.VITE_EVENT_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Basit hata yönetimi için interceptor
const setupErrorHandling = (api) => {
    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response) {
                console.error('API Error:', error.response.data);
            } else if (error.request) {
                console.error('Network Error:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            return Promise.reject(error);
        }
    );
};

setupErrorHandling(userApi);
setupErrorHandling(eventApi);

// API endpoint'leri
const endpoints = {
    // User ve Society endpoints (8080 portu)
    getSocieties: () => userApi.get('/societies'),
    getSociety: (id) => userApi.get(`/societies/${id}`),
    createSociety: (data) => userApi.post('/societies', data),
    updateSociety: (id, data) => userApi.patch(`/societies/${id}`, data),
    deleteSociety: (id) => userApi.delete(`/societies/${id}`),
    
    getUsers: () => userApi.get('/users'),
    getUser: (id) => userApi.get(`/users/${id}`),
    createUser: (data) => userApi.post('/users', data),
    updateUser: (id, data) => userApi.patch(`/users/${id}`, data),
    deleteUser: (id) => userApi.delete(`/users/${id}`),

    // Event endpoints (8081 portu)
    getEvents: () => eventApi.get('/events'),
    getEvent: (id) => eventApi.get(`/events/${id}`),
    createEvent: (data) => eventApi.post('/events', data),
    updateEvent: (id, data) => eventApi.patch(`/events/${id}`, data),
    deleteEvent: (id) => eventApi.delete(`/events/${id}`),
};

export { endpoints };