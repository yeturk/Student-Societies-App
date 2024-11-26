import React from "react";
import "../styles/society-mini.css";

function SocietyMini({ name, description }) {
	return (
		<div className="society-card-container">
			<div className="flip-card">
				<div className="flip-card-inner">
					<div className="flip-card-front logo-and-title">
						<div className="logo"></div>
						<div className="title">{name}</div>
					</div>
					<div className="flip-card-back description">
						<div className="description-text">{description}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SocietyMini;
