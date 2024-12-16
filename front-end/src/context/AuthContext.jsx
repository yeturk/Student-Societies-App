import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // localStorage'dan kullanıcı bilgisini al
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        const initialValue = JSON.parse(savedUser);
        return initialValue || null;
    });

    const login = (userData) => {
        setUser(userData);
        // Kullanıcı bilgisini localStorage'a kaydet
        localStorage.setItem('user', JSON.stringify(userData));
        if (userData.token) {
            localStorage.setItem('token', userData.token);
        }
    };

    const logout = () => {
        setUser(null);
        // Kullanıcı bilgilerini localStorage'dan temizle
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    // Sayfa yenilendiğinde token'ı kontrol et
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            const user = JSON.parse(savedUser);
            setUser(user);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);