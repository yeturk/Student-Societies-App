import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // localStorage'dan kullanıcı bilgisini al
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            return null;
        }
    });

    const login = (userData) => {
        try {
            // Kullanıcı bilgisini localStorage'a kaydet
            localStorage.setItem('user', JSON.stringify({
                ...userData,
                // Ensure followedSocieties is always an array
                followedSocieties: userData.followedSocieties || []
            }));

            // Token'ı ayrı olarak sakla
            if (userData.token) {
                localStorage.setItem('token', userData.token);
            }

            // State'i güncelle
            setUser({
                ...userData,
                followedSocieties: userData.followedSocieties || []
            });
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        // Kullanıcı bilgilerini localStorage'dan temizle
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        
        // State'i sıfırla
        setUser(null);
    };

    // Sayfa yenilendiğinde token'ı ve kullanıcı bilgisini kontrol et
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                const savedUser = localStorage.getItem('user');
                
                if (token && savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    
                    // Ensure followedSocieties is an array
                    if (!Array.isArray(parsedUser.followedSocieties)) {
                        parsedUser.followedSocieties = [];
                    }

                    setUser(parsedUser);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                // Clear potentially corrupted data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);