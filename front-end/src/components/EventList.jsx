import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Event from "./Event";
import "../styles/event-list.css";

const api = axios.create({
	baseURL: "http://localhost:4000",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

function EventList() {
	const { user } = useAuth();
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFollowedSocietiesEvents = async () => {
			if (!user || !user.followedSocieties || user.followedSocieties.length === 0) {
				setEvents([]);
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				// Get all events
				const { data: allEvents } = await api.get("/events");

				// Filter events from followed societies
				const userFollowedEvents = allEvents.filter((event) =>
					user.followedSocieties.includes(event.societyId)
				);

				// Sort events by date and get upcoming events
				const upcomingEvents = userFollowedEvents
					.filter((event) => new Date(`${event.startDate}T${event.startTime}`) > new Date())
					.sort(
						(a, b) => new Date(`${a.startDate}T${a.startTime}`) - new Date(`${b.startDate}T${b.startTime}`)
					)
					.slice(0, 5); // Limit to 5 upcoming events

				// Transform events to match the expected format
				const formattedEvents = upcomingEvents.map((event) => ({
					id: event.id,
					date: {
						day: new Date(`${event.startDate}T${event.startTime}`).getDate(),
						month: new Date(`${event.startDate}T${event.startTime}`)
							.toLocaleString("default", { month: "short" })
							.toUpperCase(),
					},
					name: event.title,
					society: user.followedSocieties.find((id) => id === event.societyId),
				}));

				setEvents(formattedEvents);
				setError(null);
			} catch (err) {
				console.error("Error fetching events:", err);
				setError("Failed to load events");
				setEvents([]);
			} finally {
				setLoading(false);
			}
		};

		fetchFollowedSocietiesEvents();
	}, [user]);

	if (loading) {
		return (
			<div className="event-list-container">
				<div className="event-list-header">
					<span>Upcoming Events</span>
				</div>
				<div className="loading-events">Loading events...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="event-list-container">
				<div className="event-list-header">
					<span>Upcoming Events</span>
				</div>
				<div className="error-events">{error}</div>
			</div>
		);
	}

	if (events.length === 0) {
		return (
			<div className="event-list-container">
				<div className="event-list-header">
					<span>Upcoming Events</span>
				</div>
				<div className="no-events">No upcoming events in your followed societies</div>
			</div>
		);
	}

	return (
		<div className="event-list-container">
			<div className="event-list-header">
				<span>Upcoming Events</span>
			</div>
			<div className="event-list">
				{events.map((event) => (
					<Event key={event.id} date={event.date} name={event.name} society={event.society} />
				))}
			</div>
		</div>
	);
}

export default EventList;
