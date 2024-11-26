import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "../styles/all-societies-page.css";
import SocietyMini from "../components/SocietyMini";
import { NavLink } from "react-router-dom";

function AllSocietiesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    // const [societies, setSocieties] = useState([]);

    const societies = [
        { id: 0, name: "Drama Club", description: "A club for actors and theatre enthusiasts." },
        { id: 1, name: "Science science science Club", description: "Exploring the wonders of science." },
        { id: 2, name: "Science science science Club", description: "Exploring the wonders of science." },
        { id: 3, name: "Science science science Club", description: "Exploring the wonders of science." },
        { id: 4, name: "Chess Club", description: "A club for chess players of all levels." },
        { id: 5, name: "Chess Club", description: "A club for chess players of all levels." },
    ];

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`http://your-backend-url/api/societies?name=${searchTerm}`);
    //         const data = await response.json();
    //         setSocieties(data); // Update societies with the search results
    //     } catch (error) {
    //         console.error("Error fetching societies:", error);
    //     }
    // };
   
    return (
        <div>
            <section className="body">
                <form className="search-form">   {/* {onSubmit={handleSearch}} */}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Search societies..."
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </form>
                <div className="societies">
                    <ul className="society-list">
                        {societies.map((society, index) => (
                            <li key={index}>
                                <NavLink to={index}>
                                    <SocietyMini className="society-item" name={society.name} description={society.description} />
                                </NavLink>
                                
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default AllSocietiesPage;
