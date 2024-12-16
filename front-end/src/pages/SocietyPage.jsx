import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "./../styles/society-page.css";
import Accordion from "../components/Accordion";
import ImageSlider from "../components/ImageSlider";

import img1 from "../assets/02.jpg";
import img2 from "../assets/03.jpg";

const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

function SocietyPage() {
    const { id } = useParams();
    const { user, login } = useAuth();
    const [society, setSociety] = useState(null);
    const [events, setEvents] = useState({ upcoming: [], past: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    const categorizeEvents = (events) => {
        const now = new Date();
        const upcoming = [];
        const past = [];

        events.forEach(event => {
            const eventDateTime = new Date(`${event.startDate}T${event.startTime}`);
            if (eventDateTime > now) {
                upcoming.push(event);
            } else {
                past.push(event);
            }
        });

        // Tarihe göre sırala
        upcoming.sort((a, b) => new Date(`${a.startDate}T${a.startTime}`) - new Date(`${b.startDate}T${b.startTime}`));
        past.sort((a, b) => new Date(`${b.startDate}T${b.startTime}`) - new Date(`${a.startDate}T${a.startTime}`));

        return { upcoming, past };
    };

    const fetchSocietyDetailsAndEvents = async () => {
        try {
            setLoading(true);
            const [societyResponse, eventsResponse] = await Promise.all([
                api.get(`/societies/${id}`),
                api.get(`/events?societyId=${id}`)
            ]);

            setSociety(societyResponse.data);
            const categorizedEvents = categorizeEvents(eventsResponse.data);
            setEvents(categorizedEvents);
            setError(null);
        } catch (err) {
            console.error('Error details:', err);
            setError('Failed to load society details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }

        try {
            const updatedFollowedSocieties = isFollowing
                ? user.followedSocieties.filter(societyId => societyId !== id)
                : [...(user.followedSocieties || []), id];

            // Kullanıcı bilgilerini güncelle
            await api.patch(`/users/${user.id}`, {
                followedSocieties: updatedFollowedSocieties
            });

            // Kulüp takipçi sayısını güncelle
            await api.patch(`/societies/${id}`, {
                numberOfFollowers: isFollowing 
                    ? (society.numberOfFollowers - 1) 
                    : (society.numberOfFollowers + 1)
            });

            // Context'teki kullanıcı bilgilerini güncelle
            login({
                ...user,
                followedSocieties: updatedFollowedSocieties
            });

            // UI durumunu güncelle
            setIsFollowing(!isFollowing);
            setSociety(prev => ({
                ...prev,
                numberOfFollowers: isFollowing 
                    ? (prev.numberOfFollowers - 1) 
                    : (prev.numberOfFollowers + 1)
            }));
        } catch (err) {
            console.error('Error updating follow status:', err);
            setError('Failed to update follow status. Please try again later.');
        }
    };

    useEffect(() => {
        fetchSocietyDetailsAndEvents();
    }, [id]);

    useEffect(() => {
        if (user && user.followedSocieties) {
            setIsFollowing(user.followedSocieties.includes(id));
        }
    }, [user, id]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const formatTime = (timeStr) => {
        return timeStr.slice(0, 5);
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
                    <button onClick={fetchSocietyDetailsAndEvents} className="retry-button">
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

    // Örnek resimler (gerçek uygulamada event'lerin kendi resimleri kullanılmalı)
    const upcomingImages = events.upcoming.length > 0 ? [img1, img2, img2] : [];
    const pastImages = events.past.length > 0 ? [img1, img2, img2] : [];

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
                            <button className="follow-button">Sign up</button>
                            <button 
                                className={`follow-button ${isFollowing ? 'following' : ''}`}
                                onClick={handleFollow}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="slider-sections">
                    {events.upcoming.length > 0 && (
                        <div className="slider-section">
                            <h2 className="slider-title">Upcoming Events</h2>
                            <ImageSlider images={upcomingImages} />
                            <div className="events-info">
                                {events.upcoming.map((event, index) => (
                                    <div key={event.id} className="event-info">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <p>Date: {formatDate(event.startDate)}</p>
                                        <p>Time: {formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                                        <p>Location: {event.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {events.past.length > 0 && (
                        <div className="slider-section">
                            <h2 className="slider-title">Past Events</h2>
                            <ImageSlider images={pastImages} />
                            <div className="events-info">
                                {events.past.map((event, index) => (
                                    <div key={event.id} className="event-info">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <p>Date: {formatDate(event.startDate)}</p>
                                        <p>Time: {formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                                        <p>Location: {event.location}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="questions-container">
                    <Accordion data={society?.questions || []} />
                </div>

                <div className="society-president-container">
                    <div className="society-info">
                        <h1 className="society-name">{society.presidentName}</h1>
                        <span className="society-description">{society.presidentMail}</span>
                        <div className="society-links">
                            <button className="email-button">
                                Send an e-mail
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SocietyPage;