import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../styles/all-societies-page.css";
import SocietyMini from "../components/SocietyMini";

function AllSocietiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFollowedOnly, setShowFollowedOnly] = useState(false);
    const [allSocieties, setAllSocieties] = useState([]); // Tüm topluluklar
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // İlk yüklemede tüm toplulukları getir
    useEffect(() => {
        fetchSocieties();
    }, []);

    const fetchSocieties = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://your-backend-url/api/societies');
            if (!response.ok) {
                throw new Error('Failed to fetch societies');
            }
            const data = await response.json();
            setAllSocieties(data);
            setError(null);
        } catch (err) {
            setError('Failed to load societies. Please try again later.');
            console.error('Error fetching societies:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Client-side filtreleme
    const getFilteredSocieties = () => {
        return allSocieties.filter(society => {
            const matchesSearch = 
                society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                society.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFollowing = !showFollowedOnly || society.isFollowing;

            return matchesSearch && matchesFollowing;
        });
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFollowingFilter = (e) => {
        setShowFollowedOnly(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    if (isLoading) {
        return (
            <div className="body">
                <div className="loading-spinner">Loading societies...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="body">
                <div className="error-message">{error}</div>
                <button onClick={fetchSocieties} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    const filteredSocieties = getFilteredSocieties();
   
    return (
        <div>
            <section className="body">
                <div className="search-container">
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Search societies..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <FaSearch className="search-icon" />
                        </button>
                    </form>
                    <div className="filter-container">
                        <label className="filter-label">
                            <input
                                type="checkbox"
                                checked={showFollowedOnly}
                                onChange={handleFollowingFilter}
                                className="filter-checkbox"
                            />
                            <span>Show Following Only</span>
                        </label>
                    </div>
                </div>
                <div className="societies">
                    <TransitionGroup className="society-list">
                        {filteredSocieties.map((society) => (
                            <CSSTransition
                                key={society.id}
                                timeout={500}
                                classNames="society-item"
                            >
                                <li>
                                    <NavLink to={`${society.id}`}>
                                        <SocietyMini 
                                            className="society-item" 
                                            name={society.name} 
                                            description={society.description} 
                                            isFollowing={society.isFollowing}
                                        />
                                    </NavLink>
                                </li>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </div>
            </section>
        </div>
    );
}

export default AllSocietiesPage;