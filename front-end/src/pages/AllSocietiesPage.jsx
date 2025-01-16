import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink, useSearchParams } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useAuth } from "../context/AuthContext";
import "../styles/all-societies-page.css";
import SocietyMini from "../components/SocietyMini";
import { endpoints } from '../services/api';

function AllSocietiesPage() {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [showFollowedOnly, setShowFollowedOnly] = useState(
        searchParams.get("followed") === "true"
    );
    const [allSocieties, setAllSocieties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSociety, setSelectedSociety] = useState(null);

    useEffect(() => {
        fetchSocieties();
    }, [user]);

    useEffect(() => {
        setShowFollowedOnly(searchParams.get("followed") === "true");
    }, [searchParams]);

    const fetchSocieties = async () => {
        try {
            setIsLoading(true);
            const { data } = await endpoints.getSocieties();
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
            // Search term filter
            const matchesSearch = 
                society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (society.description && society.description.toLowerCase().includes(searchTerm.toLowerCase()));
            
            // Eğer showFollowedOnly false ise, sadece search filtresini uygula
            if (!showFollowedOnly) return matchesSearch;
            
            // Eğer showFollowedOnly true ise ve kullanıcı giriş yapmışsa
            if (user && user.followedSocieties) {
                return matchesSearch && user.followedSocieties.includes(society.id.toString());
            }
            
            return false;
        });
    };

    const handleDeleteClick = (society, e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedSociety(society);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedSociety) return;
        
        try {
            await endpoints.deleteSociety(selectedSociety.id);
            setShowDeleteModal(false);
            setSelectedSociety(null);
            await fetchSocieties();
            setError(null);
        } catch (err) {
            console.error('Error deleting society:', err);
            setError('Failed to delete society. Please try again later.');
        }
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
                    {user && (
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
                    )}
                </div>
                <div className="societies">
                    <TransitionGroup className="society-list">
                    {filteredSocieties.map((society) => (
                        <CSSTransition
                            key={society.id}
                            timeout={500}
                            classNames="society-item"
                        >
                            <li className="society-wrapper">
                                <NavLink to={`/societies/${society.id}`}>
                                    <SocietyMini 
                                        className="society-item" 
                                        name={society.name} 
                                        description={society.description} 
                                        isFollowing={user?.followedSocieties?.includes(society.id.toString())}
                                    />
                                </NavLink>
                                {user?.role === 'admin' && (
                                    <div className="society-actions">
                                        <NavLink 
                                            to={`/societies/edit/${society.id}`} 
                                            className="edit-button"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Edit
                                        </NavLink>
                                        <button 
                                            className="delete-button"
                                            onClick={(e) => handleDeleteClick(society, e)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </li>
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                </div>
            </section>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete {selectedSociety?.name}?</p>
                        <p>This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button 
                                className="cancel-button"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedSociety(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="confirm-delete-button"
                                onClick={handleDeleteConfirm}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllSocietiesPage;