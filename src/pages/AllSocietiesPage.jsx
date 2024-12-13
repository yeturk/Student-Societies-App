import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink, useSearchParams } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import axios from "axios";
import "../styles/all-societies-page.css";
import SocietyMini from "../components/SocietyMini";

const api = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

function AllSocietiesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [showFollowedOnly, setShowFollowedOnly] = useState(
        searchParams.get("followed") === "true"
    );
    const [allSocieties, setAllSocieties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSocieties();
    }, []);

    // Listen for URL parameter changes
    useEffect(() => {
        setShowFollowedOnly(searchParams.get("followed") === "true");
    }, [searchParams]);

    const fetchSocieties = async () => {
        try {
            setIsLoading(true);
            const { data } = await api.get('/societies');
            setAllSocieties(data);
            setError(null);
        } catch (err) {
            setError('Failed to load societies. Please try again later.');
            console.error('Error fetching societies:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getFilteredSocieties = () => {
        return allSocieties.filter(society => {
            const matchesSearch = 
                society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (society.description && society.description.toLowerCase().includes(searchTerm.toLowerCase()));
            
            const matchesFollowing = !showFollowedOnly || society.isFollowing;

            return matchesSearch && matchesFollowing;
        });
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFollowingFilter = (e) => {
        const isChecked = e.target.checked;
        const newParams = new URLSearchParams(searchParams);
        
        if (isChecked) {
            newParams.set("followed", "true");
        } else {
            newParams.delete("followed");
        }
        
        setSearchParams(newParams);
        setShowFollowedOnly(isChecked);
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
                            <NavLink to={`/societies/${society.id}`}>
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