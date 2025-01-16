import React from "react";
import "../styles/society-mini.css";

function SocietyMini({ name, description, isFollowing }) {
    console.log(description);
    console.log(name);
    return (
        <div className="society-card-container">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front logo-and-title">
                        <div className="logo"></div>
                        <div className="title">{name}</div>
                        {isFollowing && <div className="following-badge">Following</div>}
                    </div>
                    <div className="flip-card-back description">
                        <div className="description-text">
                            {description || "No description available"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SocietyMini;