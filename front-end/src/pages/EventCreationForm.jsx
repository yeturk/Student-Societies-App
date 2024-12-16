import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPencilAlt, FaMapMarkerAlt, FaUsers, FaAlignLeft, FaCalendarAlt, FaClock, FaImage } from "react-icons/fa";
import "../styles/event-creation.css";

const EventCreationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    type: "",
    guests: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.location.trim()) return "Location is required";
    if (!formData.startDate) return "Start date is required";
    if (!formData.startTime) return "Start time is required";
    if (!formData.endDate) return "End date is required";
    if (!formData.endTime) return "End time is required";
    if (!formData.type) return "Event type is required";

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (endDateTime <= startDateTime) {
      return "End time must be after start time";
    }

    return "";
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 800 * 1024) {
        setError("Image size should be less than 800KB");
        return;
      }

      setFormData({
        ...formData,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        startDate: formData.startDate,
        startTime: formData.startTime,
        endDate: formData.endDate,
        endTime: formData.endTime,
        type: formData.type,
        guests: formData.guests,
        societyId: "1", // Dinamik olarak alınmalı
      };

      // Image upload logic - commented out for now
      /*
      if (formData.image) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('image', formData.image);
        const imageResponse = await axios.post('/api/upload', formDataWithImage);
        eventData.imageUrl = imageResponse.data.url;
      }
      */

      const response = await axios.post('http://localhost:4000/events', eventData);
      console.log('Event created successfully:', response.data);
      navigate('/societies/1');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event. Please try again.");
      console.error('Error creating event:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-creation-page">
      <div className="event-creation-container">
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>Event Details</h4>

            <div className="input-group input-group-icon">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaPencilAlt />
              </div>
            </div>

            <div className="image-upload-section">
              <div className="image-upload-container">
                <div className="image-preview-area">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Event preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">
                      <FaImage />
                      <p>Event Image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="event-image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <label htmlFor="event-image" className="file-label">
                    <FaImage />
                    <span>Upload Image</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="input-group input-group-icon">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaAlignLeft />
              </div>
            </div>

            <div className="input-group input-group-icon">
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaMapMarkerAlt />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <h4>Start Date and Time</h4>
              <div className="datetime-container">
                <div className="date-input input-group input-group-icon">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                  <div className="input-icon">
                    <FaCalendarAlt />
                  </div>
                </div>
                <div className="time-input input-group input-group-icon">
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                  <div className="input-icon">
                    <FaClock />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-column">
              <h4>End Date and Time</h4>
              <div className="datetime-container">
                <div className="date-input input-group input-group-icon">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                  <div className="input-icon">
                    <FaCalendarAlt />
                  </div>
                </div>
                <div className="time-input input-group input-group-icon">
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                  <div className="input-icon">
                    <FaClock />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-column">
              <h4>Type</h4>
              <div className="input-group">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option value="">Select event type</option>
                  <option value="conference">Conference</option>
                  <option value="sportif">Sportif</option>
                  <option value="panel">Panel</option>
                  <option value="seminar">Seminar</option>
                  <option value="trip">Trip</option>
                  <option value="stand">Stand</option>
                  <option value="meeting">Meeting</option>
                  <option value="cultural">Cultural</option>
                  <option value="social-responsibility">Social Responsibility</option>
                </select>
              </div>
            </div>

            <div className="form-column">
              <h4>Guests</h4>
              <div className="input-group input-group-icon">
                <input
                  type="text"
                  name="guests"
                  placeholder="Guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                />
                <div className="input-icon">
                  <FaUsers />
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="create-event-button-wrapper">
              <button 
                type="submit" 
                className="create-event-submit-button"
                disabled={loading}
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreationForm;