import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import axios from "axios";

import "./../styles/society-page.css";
import Accordion from "../components/Accordion";
import ImageSlider from "../components/ImageSlider";

import img1 from "../assets/02.jpg";
import img2 from "../assets/03.jpg";
import img3 from "../assets/09.jpg";

const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

function SocietyPage() {
    const { id } = useParams();
    const [society, setSociety] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const images1 = [img1, img2, img2]; // Upcoming events images
    const images2 = [img1, img2, img2]; // Past events images

    useEffect(() => {
        console.log('Society ID:', id);
        fetchSocietyDetails();
    }, [id]);

    const fetchSocietyDetails = async () => {
        try {
            setLoading(true);
            console.log('Fetching data for society ID:', id);
            const response = await api.get(`/societies/${id}`);
            console.log('API Response:', response.data);
            setSociety(response.data);
            setError(null);
        } catch (err) {
            console.error('Error details:', err.response || err);
            setError('Failed to load society details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="body">
                <div className="loading-spinner">Loading society details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="body">
                <div className="error-message">
                    {error}
                    <button onClick={fetchSocietyDetails} className="retry-button">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!society) {
        return (
            <div className="body">
                <div className="error-message">Society not found</div>
            </div>
        );
    }

    return (
        <div className="society-page-container">
            <section className="body">
                <div className="logo-info-container">
                    <div className="society-logo-container">
                        <div className="society-logo">
                            {society.logo && <img src={society.logo} alt={`${society.name} logo`} />}
                        </div>
                    </div>
                    <div className="society-info">
                        <h1 className="society-name">{society.name}</h1>
                        <span className="society-description">{society.description}</span>
                        <div className="society-links">
                            <div className="social-media-accounts">
                                {society?.instagram && (
                                    <a 
                                        href={society.instagram} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label="Instagram"
                                    > 
                                        <FaInstagram />
                                    </a>
                                )}
                                {society?.x && (
                                    <a 
                                        href={society.x} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        aria-label="X (formerly Twitter)"
                                    >
                                        <FaXTwitter />
                                    </a>
                                )}
                                <div className="follower-count">
                                    <FaUser />
                                    <span>{society.numberOfFollowers || 0}</span>
                                </div>
                            </div>
                            <div className="follow-button">Sign up</div>
                            <div className="follow-button">Follow</div>
                        </div>
                    </div>
                </div>

                <div className="image-slider-container">
                    {images1.length > 0 && (
                        <div className="activities">
                            <p className="activities-title">Upcoming Events</p>
                            <div className="image-slider">
                                <ImageSlider images={images1} />
                            </div>
                        </div>
                    )}
                    {images2.length > 0 && (
                        <div className="activities">
                            <p className="activities-title">Past Events</p>
                            <div className="image-slider">
                                <ImageSlider images={images2} />
                            </div>
                        </div>
                    )}
                </div>

                <div className="questions-container">
                    <Accordion data={society?.questions || []} />
                </div>

                <div className="society-president-container">
                    <div className="society-info">
                        <h1 className="society-name">{society["presidentName"]}</h1>
                        <span className="society-description">{society["presidentMail"]}</span>
                        <div className="society-links">
                            <div className="email-button" >
                                Send an e-mail
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SocietyPage;