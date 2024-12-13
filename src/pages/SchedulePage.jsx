import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/schedule.css";

const api = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

function SchedulePage() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/events");
			setEvents(data);
			setError(null);
		} catch (err) {
			setError("Failed to load events.");
			console.error("Error fetching events:", err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div className="loading-spinner">Loading events...</div>;
	}

	if (error) {
		return (
			<div className="schedule-container">
				<p className="error-message">{error}</p>
				<button onClick={fetchEvents} className="retry-button">
					Try Again
				</button>
			</div>
		);
	}

	return (
		<div className="schedule-container">
			<h1>Schedule</h1>
			<div className="events-list">
				{events.length === 0 ? (
					<p>No events found</p>
				) : (
					events.map((event) => (
						<div key={event.id} className="event-card">
							<h3>{event.title}</h3>
							{event.date && <p>Date: {new Date(event.date).toLocaleDateString()}</p>}
							{event.description && <p>{event.description}</p>}
							{event.location && <p>Location: {event.location}</p>}
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default SchedulePage;
