// services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const societiesApi = {
    getAll: () => api.get('/societies'),
    getById: (id) => api.get(`/societies/${id}`),
    create: (data) => api.post('/societies', data),
    update: (id, data) => api.patch(`/societies/${id}`, data),
    delete: (id) => api.delete(`/societies/${id}`)
};

export const eventsApi = {
    getAll: () => api.get('/events'),
    getAllBySociety: (societyId) => api.get(`/events?societyId=${societyId}`),
    getById: (id) => api.get(`/events/${id}`),
    create: (data) => api.post('/events', data),
    update: (id, data) => api.patch(`/events/${id}`, data),
    delete: (id) => api.delete(`/events/${id}`)
};

export const usersApi = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post('/users', data),
    update: (id, data) => api.patch(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`),
    login: (email, password) => api.get('/users').then(response => {
        const user = response.data.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Invalid credentials');
        return user;
    })
};

// Error interceptor
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error.response?.data?.message || 'An error occurred');
    }
);

export default api;