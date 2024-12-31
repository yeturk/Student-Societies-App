// Homepage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/homepage.css";
import Societies from "../components/Societies";
import ImageSlider from "../components/ImageSlider";
import EventList from "../components/EventList";
import { endpoints } from '../services/api';

function Homepage() {
    const { user } = useAuth();
    const [followedSocieties, setFollowedSocieties] = useState([]);
    const [popularSocieties, setPopularSocieties] = useState([]);
    const [allSocieties, setAllSocieties] = useState([]);
    const [upcomingEventsData, setUpcomingEventsData] = useState([]); 
    const [pastEventsData, setPastEventsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const MAX_SOCIETIES = 5;

    useEffect(() => {
        fetchSocieties();
        fetchEvents();
    }, [user]);

    const sortByFollowers = (societies) => {
        return [...societies].sort((a, b) => {
            const numberOfFollowersA = Number(a.numberOfFollowers) || 0;
            const numberOfFollowersB = Number(b.numberOfFollowers) || 0;
            return numberOfFollowersB - numberOfFollowersA;
        });
    };

    const fetchEvents = async () => {
        try {
            const { data } = await endpoints.getEvents();
            const currentDate = new Date();

            const upcoming = [];
            const past = [];

            data.forEach(event => {
                const eventDate = new Date(event.startDate);
                const eventWithImage = {
                    ...event,
                    imageUrl: event.image || `https://picsum.photos/800/400?random=${event.id}`
                };

                if (eventDate > currentDate) {
                    upcoming.push(eventWithImage);
                } else {
                    past.push(eventWithImage);
                }
            });

            // Tarihe göre sırala
            upcoming.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
            past.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

            setUpcomingEventsData(upcoming);
            setPastEventsData(past);
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    const fetchSocieties = async () => {
        try {
            setLoading(true);
            const { data } = await endpoints.getSocieties();
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
                    {upcomingEventsData.length > 0 && (
                        <div className="slider-section">
                            <h2 className="slider-title">Upcoming Events</h2>
                            <ImageSlider 
                                events={upcomingEventsData} 
                                isUpcoming={true}
                            />
                        </div>
                    )}
                    {pastEventsData.length > 0 && (
                        <div className="slider-section">
                            <h2 className="slider-title">Past Events</h2>
                            <ImageSlider 
                                events={pastEventsData}
                                isUpcoming={false}
                            />
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