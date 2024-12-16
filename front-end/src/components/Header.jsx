import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiSpeedypage } from "react-icons/si";
import { CgCommunity } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { FaHome, FaUserCircle, FaPlus } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import "../styles/header.css";

function Header() {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest(".profile-section")) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isDropdownOpen]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const renderDropdownOptions = () => {
        switch(user.role) {
            case 'admin':
                return (
                    <>
                        <NavLink to="/profile" className="dropdown-item">
                            My Profile
                        </NavLink>
                        <NavLink to="/settings" className="dropdown-item">
                            Settings
                        </NavLink>
                        <NavLink to="/create-society" className="dropdown-item">
                            <FaPlus className="dropdown-icon" /> Create Society
                        </NavLink>
                        <button onClick={handleLogout} className="dropdown-item logout-button">
                            Logout
                        </button>
                    </>
                );
            case 'society-leader':
                // Find the society the user is leading
                const leadingSocietyId = user.leadingSocietyId; // Assume this is added to user object
                return (
                    <>
                        <NavLink to="/profile" className="dropdown-item">
                            My Profile
                        </NavLink>
                        <NavLink to="/settings" className="dropdown-item">
                            Settings
                        </NavLink>
                        <NavLink 
                            to={`/create-event?societyId=${leadingSocietyId}`} 
                            className="dropdown-item"
                        >
                            <FaPlus className="dropdown-icon" /> Create Event for My Society
                        </NavLink>
                        <button onClick={handleLogout} className="dropdown-item logout-button">
                            Logout
                        </button>
                    </>
                );
            default: // For regular users
                return (
                    <>
                        <NavLink to="/profile" className="dropdown-item">
                            My Profile
                        </NavLink>
                        <NavLink to="/settings" className="dropdown-item">
                            Settings
                        </NavLink>
                        <button onClick={handleLogout} className="dropdown-item logout-button">
                            Logout
                        </button>
                    </>
                );
        }
    };

    return (
        <header className="header-container">
            <div className="logo-section">
                <SiSpeedypage className="app-icon" />
                <NavLink to="/homepage" className="app-name">
                    SSApp
                </NavLink>
            </div>
            <nav className="navigation-links">
                <div className="nav-item">
                    <FaHome />
                    <NavLink to="/homepage" className={({ isActive }) => (isActive ? "nav-link selected" : "nav-link")}>
                        Home
                    </NavLink>
                </div>
                <div className="nav-item">
                    <CgCommunity />
                    <NavLink
                        to="/societies"
                        className={({ isActive }) => (isActive ? "nav-link selected" : "nav-link")}>
                        All Societies
                    </NavLink>
                </div>
                <div className="nav-item">
                    <IoCalendarOutline />
                    <NavLink to="/schedule" className={({ isActive }) => (isActive ? "nav-link selected" : "nav-link")}>
                        Schedule
                    </NavLink>
                </div>
            </nav>
            <div className="profile-container">
                {user ? (
                    <div className="profile-section">
                        <div className="profile-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <FaUserCircle className="profile-icon" />
                            <span className="username">{user.name}</span>
                            <IoMdArrowDropdown />
                        </div>
                        {isDropdownOpen && (
                            <div className="profile-dropdown">
                                {renderDropdownOptions()}
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink to="/login" className="login-button">
                        Log in
                    </NavLink>
                )}
            </div>
        </header>
    );
}

export default Header;