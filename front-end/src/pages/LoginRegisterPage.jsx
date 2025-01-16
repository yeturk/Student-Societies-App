import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { IoMdBusiness } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import "../styles/login-register-page.css";
import { endpoints } from "../services/api";



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
			const response = await endpoints.loginStudent({
				email: formData.login.email,
				password: formData.login.password,
			});
	
			const user = response.data;
			console.log("Received user data:", user); // Debug için
	
			// Kullanıcı verisi kontrolü
			if (user && user.email) { // id yerine email ile kontrol yapıyoruz
				// Zorunlu alanların varlığını kontrol et
				if (!user.name || !user.department) {
					setError("Invalid user data. Please contact support.");
					return;
				}
	
				// id boş string ise veya undefined ise
				const userId = user.id || '0'; // Varsayılan bir id atıyoruz
	
				setSuccess(`Welcome back, ${user.name}! You have successfully logged in.`);
				login({
					id: userId,
					name: user.name,
					email: user.email,
					department: user.department,
					role: user.role || 'student',
					followedSocieties: Array.isArray(user.followedSocieties) ? user.followedSocieties : []
				});
	
				setTimeout(() => {
					navigate("/homepage");
				}, 1500);
			} else {
				setError("Invalid credentials. Please check your email and password.");
				console.error("Invalid user data received:", user);
			}
		} catch (err) {
			console.error("Login error details:", err);
			if (err.response?.status === 401) {
				setError("Invalid email or password. Please check your credentials.");
			} else if (err.response?.status === 404) {
				setError("User not found. Please check your email or register a new account.");
			} else {
				setError("An error occurred while logging in. Please try again later.");
			}
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

		if (!formData.register.email.endsWith("@gtu.edu.tr")) {
			setError("Please use a valid GTU email address (@gtu.edu.tr)");
			return;
		}

		try {
			const newUser = {
				name: formData.register.name,
				email: formData.register.email,
				password: formData.register.password,
				department: formData.register.department,
				role: "student",
				notificationOpenForEmail: true,
				followedSocieties: [],
			};

			console.log("Attempting to register with data:", newUser); // Debug için

			const response = await endpoints.createStudent(newUser);

			if (response.data) {
				setSuccess("Registration successful! You can now log in with your credentials.");
				setIsLoginActive(true);

				setFormData({
					...formData,
					register: {
						name: "",
						department: "",
						email: "",
						password: "",
						confirmPassword: "",
					},
				});
			} else {
				setError("Registration failed. Please try again.");
			}
		} catch (err) {
			console.error("Full error object:", err); // Debug için
			if (err.response?.status === 405) {
				setError("Server configuration error. Please try again later.");
			} else if (err.response?.status === 400) {
				setError(err.response.data.message || "Invalid input. Please check your details.");
			} else {
				setError("An error occurred during registration. Please try again later.");
			}
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
							<span
								onClick={() => navigate("/forgot-password")}
								style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
								Forgot Password?
							</span>
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
								<option value="" disabled>
									Department
								</option>
								<option value="Computer Engineering">Computer Engineering</option>
								<option value="Electrical Engineering">Electrical Engineering</option>
								<option value="Mechanical Engineering">Mechanical Engineering</option>
								<option value="Business Administration">Business Administration</option>
								<option value="Psychology">Psychology</option>
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
