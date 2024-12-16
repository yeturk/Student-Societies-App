import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/homepage.css";
import Societies from "../components/Societies";
import ImageSlider from "../components/ImageSlider";
import EventList from "../components/EventList";
import axios from "axios";

import img1 from "../assets/02.jpg";
import img2 from "../assets/03.jpg";

const api = axios.create({
    baseURL: "http://localhost:4000",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

function Homepage() {
    const { user } = useAuth();
    const [followedSocieties, setFollowedSocieties] = useState([]);
    const [popularSocieties, setPopularSocieties] = useState([]);
    const [allSocieties, setAllSocieties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const MAX_SOCIETIES = 5;
    const upcomingEvents = [img1, img2, img2];
    const pastEvents = [img1, img2, img2];

    useEffect(() => {
        fetchSocieties();
    }, [user]);

    const sortByFollowers = (societies) => {
        return [...societies].sort((a, b) => {
            const numberOfFollowersA = Number(a.numberOfFollowers) || 0;
            const numberOfFollowersB = Number(b.numberOfFollowers) || 0;
            return numberOfFollowersB - numberOfFollowersA;
        });
    };

    const fetchSocieties = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/societies");
            setAllSocieties(data);

            if (user && user.followedSocieties) {
                const followedSocietiesData = data.filter(society => 
                    user.followedSocieties.includes(society.id)
                );
                setFollowedSocieties(sortByFollowers(followedSocietiesData).slice(0, MAX_SOCIETIES));
            } else {
                setFollowedSocieties([]);
            }

            setPopularSocieties(sortByFollowers(data).slice(0, MAX_SOCIETIES));
            setError(null);
        } catch (err) {
            setError("Failed to load societies.");
            console.error("Error fetching societies:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading societies...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={fetchSocieties} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="homepage-container">
            <div className="homepage-left homepage-section">
                <div className="left-container">
                    {user && (
                        <Societies 
                            title="Followed Societies" 
                            societies={followedSocieties}
                        />
                    )}
                    <Societies title="Popular Societies" societies={popularSocieties} />
                </div>
            </div>
            <div className="homepage-middle homepage-section">
                <div className="middle-container">
                    {upcomingEvents && upcomingEvents.length > 0 && (
                        <div className="slider-section">
                            <h2 className="slider-title">Upcoming Events</h2>
                            <ImageSlider images={upcomingEvents} />
                        </div>
                    )}
                    {pastEvents && pastEvents.length > 0 && (
                        <div className="slider-section">
                            <h2 className="slider-title">Past Events</h2>
                            <ImageSlider images={pastEvents} />
                        </div>
                    )}
                </div>
            </div>
            <div className="homepage-right homepage-section">
                <div className="right-container">
                    <EventList />
                </div>
            </div>
        </div>
    );
}

export default Homepage;