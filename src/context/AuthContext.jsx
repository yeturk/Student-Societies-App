import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("currentUser");
		return savedUser ? JSON.parse(savedUser) : null;
	});

	const login = (userData) => {
		setUser(userData);
		localStorage.setItem("currentUser", JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("currentUser");
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
