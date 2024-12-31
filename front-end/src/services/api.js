// src/services/api.js
import axios from 'axios';

// Vite için environment variable kullanımı
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor - örneğin token ekleme için
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - hata yönetimi için
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Sunucu yanıtı ile dönen hatalar (400-500)
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Yanıt alınamayan istekler
            console.error('Network Error:', error.request);
        } else {
            // İstek oluşturulurken oluşan hatalar
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// API endpoint'leri için yardımcı fonksiyonlar
const endpoints = {
    // Societies
    getSocieties: () => api.get('/societies'),
    getSociety: (id) => api.get(`/societies/${id}`),
    createSociety: (data) => api.post('/societies', data),
    updateSociety: (id, data) => api.patch(`/societies/${id}`, data),
    deleteSociety: (id) => api.delete(`/societies/${id}`),

    // Events
    getEvents: () => api.get('/events'),
    getEvent: (id) => api.get(`/events/${id}`),
    createEvent: (data) => api.post('/events', data),
    updateEvent: (id, data) => api.patch(`/events/${id}`, data),
    deleteEvent: (id) => api.delete(`/events/${id}`),

    // Users
    getUsers: () => api.get('/users'),
    getUser: (id) => api.get(`/users/${id}`),
    createUser: (data) => api.post('/users', data),
    updateUser: (id, data) => api.patch(`/users/${id}`, data),
    deleteUser: (id) => api.delete(`/users/${id}`),
    
    // Auth
    login: (credentials) => api.post('/login', credentials),
    register: (userData) => api.post('/register', userData)
};

export { api, endpoints };