import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiSpeedypage } from "react-icons/si";
import { CgCommunity } from "react-icons/cg";
import { IoCalendarOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import "../styles/header.css";

function Header() {
	return (
		<header className="header-container">
			<div className="logo-section">
				<SiSpeedypage className="app-icon" />
				<NavLink to="/" className="app-name">
					SSApp
				</NavLink>
			</div>
			<nav className="navigation-links">
				<div className="nav-item">
					<FaHome />
					<NavLink to="/" className={({ isActive }) => (isActive ? "nav-link selected" : "nav-link")}>
						Home
					</NavLink>
				</div>
				<div className="nav-item">
					<CgCommunity />
					<NavLink
						to="/all-societies"
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
				{/* <div className="nav-item">
					<FaHome />
					<NavLink to="/society-page" className={({ isActive }) => (isActive ? "nav-link selected" : "nav-link")}>
						Society Page
					</NavLink>
				</div> */}
			</nav>
			<div className="login-button-container">
				<NavLink to="/login" className="login-button">
					Log in
				</NavLink>
			</div>
		</header>
	);
}

export default Header;
