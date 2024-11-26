import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
    	<div className="footer-content">
        	<div className="footer-section about">
          		<h2>About</h2>
          		<p> This app provides information on all student societies at our university. Find your interests
            		and connect with your community! </p>
        	</div>

			<div className="footer-section links">
				<h2>Quick Links</h2>
					<ul>
						<li> <NavLink to="/" className="footer-link"> Home </NavLink> </li>
						<li> <NavLink to="/about" className="footer-link"> About Us </NavLink> </li>
						<li> <NavLink to="/contact" className="footer-link"> Contact </NavLink> </li>
						<li> <NavLink to="/privacy" className="footer-link">Privacy Policy </NavLink> </li>
					</ul>
			</div>

			<div className="footer-section contact">
				<h2>Contact Us</h2>
				<p>Email: student.societies@gtu.edu.tr</p>
			</div>
      	</div>

      	<div className="footer-bottom">
        	&copy; {new Date().getFullYear()} University Student Societies. All rights reserved.
      	</div>
    </footer>
  );
};

export default Footer;
 