// LoginRegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { IoMdBusiness } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import "../styles/login-register-page.css";
import { endpoints } from '../services/api';

function LoginRegisterPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoginActive, setIsLoginActive] = useState(false);
    const [formData, setFormData] = useState({
        login: { email: "", password: "" },
        register: {
            name: "",
            department: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError("");
                setSuccess("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleLoginChange = (e) => {
        setFormData({
            ...formData,
            login: {
                ...formData.login,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleRegisterChange = (e) => {
        setFormData({
            ...formData,
            register: {
                ...formData.register,
                [e.target.name]: e.target.value,
            },
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            // Kullanıcıları al ve email/şifre eşleşmesini kontrol et
            const { data: users } = await endpoints.getUsers();
            const user = users.find(
                (user) => user.email === formData.login.email && user.password === formData.login.password
            );

            if (user) {
                setSuccess(`Welcome back, ${user.name}! You have successfully logged in.`);
                login({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    department: user.department,
                    role: user.role,
                    followedSocieties: user.followedSocieties || [],
                });

                setTimeout(() => {
                    navigate("/homepage");
                }, 1500);
            } else {
                setError("Invalid email or password. Please check your credentials and try again.");
            }
        } catch (err) {
            setError("An error occurred while logging in. Please try again later.");
            console.error("Login error:", err);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.register.password !== formData.register.confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        try {
            // Email kontrolü için kullanıcıları al
            const { data: users } = await endpoints.getUsers();
            const existingUser = users.find((user) => user.email === formData.register.email);

            if (existingUser) {
                setError("This email is already registered. Please use a different email address.");
                return;
            }

            const newUser = {
                id: users.length + 1,
                name: formData.register.name,
                department: formData.register.department,
                email: formData.register.email,
                password: formData.register.password,
                role: "student",
                followedSocieties: [],
            };

            await endpoints.createUser(newUser);
            setSuccess("Registration successful! You can now log in with your credentials.");
            setIsLoginActive(true);
        } catch (err) {
            setError("An error occurred during registration. Please try again later.");
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="auth-container">
            <div className={`auth-wrapper ${isLoginActive ? "active" : ""}`}>
                {error && (
                    <div className="auth-message auth-error">
                        <FaExclamationCircle />
                        {error}
                    </div>
                )}
                {success && (
                    <div className="auth-message auth-success">
                        <FaCheckCircle />
                        {success}
                    </div>
                )}

                <div className={`auth-form-box login ${isLoginActive ? "" : "active"}`}>
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        <div className="auth-input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.login.email}
                                onChange={handleLoginChange}
                                required
                            />
                            <FaUser />
                        </div>
                        <div className="auth-input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.login.password}
                                onChange={handleLoginChange}
                                required
                            />
                            <FaLock />
                        </div>

                        <div className="auth-forgot-link">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className="auth-btn">
                            Login
                        </button>
                    </form>
                </div>

                <div className={`auth-form-box register ${isLoginActive ? "hidden" : ""}`}>
                    <form onSubmit={handleRegister}>
                        <h1>Register</h1>
                        <div className="auth-input-box">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.register.name}
                                onChange={handleRegisterChange}
                                required
                            />
                            <FaUser />
                        </div>

                        <div className="auth-input-box" id="dprtmnt">
                            <select
                                name="department"
                                value={formData.register.department}
                                onChange={handleRegisterChange}
                                required>
                                <option value="" disabled selected>
                                    Department
                                </option>
                                <option value="computer-science">Computer Science</option>
                                <option value="electrical-engineering">Electrical Engineering</option>
                                <option value="mechanical-engineering">Mechanical Engineering</option>
                                <option value="business">Business</option>
                                <option value="psychology">Psychology</option>
                            </select>
                            <IoMdBusiness />
                        </div>

                        <div className="auth-input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.register.email}
                                onChange={handleRegisterChange}
                                required
                            />
                            <FaEnvelope />
                        </div>

                        <div className="auth-input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.register.password}
                                onChange={handleRegisterChange}
                                required
                            />
                            <FaLock />
                        </div>

                        <div className="auth-input-box">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.register.confirmPassword}
                                onChange={handleRegisterChange}
                                required
                            />
                            <FaLock />
                        </div>

                        <button type="submit" className="auth-btn">
                            Register
                        </button>
                    </form>
                </div>

                <div className="auth-toggle-box">
                    <div className="auth-toggle-panel toggle-left">
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button className="auth-btn auth-toggle-btn" onClick={() => setIsLoginActive(!isLoginActive)}>
                            Register
                        </button>
                    </div>

                    <div className="auth-toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="auth-btn auth-toggle-btn" onClick={() => setIsLoginActive(!isLoginActive)}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegisterPage;