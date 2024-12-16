import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPencilAlt, FaCalendarAlt, FaInstagram, FaFacebook, FaUser, FaEnvelope, FaImage } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/society-creation.css";

const SocietyCreationForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdDate: "",
    instagram: "",
    x: "",
    facebook: "",
    presidentName: "",
    presidentEmail: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.presidentName.trim()) return "President name is required";
    if (!formData.presidentEmail.trim()) return "President email is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.presidentEmail)) {
      return "Invalid email format";
    }

    const urlRegex = /^https?:\/\/.+/;
    if (formData.instagram && !urlRegex.test(formData.instagram)) {
      return "Instagram URL must be valid";
    }
    if (formData.x && !urlRegex.test(formData.x)) {
      return "X URL must be valid";
    }
    if (formData.facebook && !urlRegex.test(formData.facebook)) {
      return "Facebook URL must be valid";
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
      const societyData = {
        name: formData.title,
        description: formData.description,
        numberOfFollowers: 0,
        instagram: formData.instagram,
        x: formData.x,
        facebook: formData.facebook,
        presidentName: formData.presidentName,
        presidentMail: formData.presidentEmail,
        questions: []
      };

      // Image upload logic - commented out for now
      /*
      if (formData.image) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('image', formData.image);
        const imageResponse = await axios.post('/api/upload', formDataWithImage);
        societyData.logo = imageResponse.data.url;
      }
      */

      const response = await axios.post('http://localhost:4000/societies', societyData);
      console.log('Society created successfully:', response.data);
      navigate('/societies');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create society. Please try again.");
      console.error('Error creating society:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="society-creation-page">
      <div className="event-creation-container">
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h4>Society Details</h4>

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
                    <img src={imagePreview} alt="Society preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">
                      <FaImage />
                      <p>Society Logo</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="society-logo"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <label htmlFor="society-logo" className="file-label">
                    <FaImage />
                    <span>Upload Logo</span>
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
                <FaPencilAlt />
              </div>
            </div>

            <div className="input-group input-group-icon">
              <input
                type="date"
                name="createdDate"
                placeholder="Created Date"
                value={formData.createdDate}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaCalendarAlt />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Social Media Links</h4>
            <div className="input-group input-group-icon">
              <input
                type="text"
                name="instagram"
                placeholder="Instagram URL"
                value={formData.instagram}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaInstagram />
              </div>
            </div>

            <div className="input-group input-group-icon">
              <input
                type="text"
                name="x"
                placeholder="X (Twitter) URL"
                value={formData.x}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaXTwitter />
              </div>
            </div>

            <div className="input-group input-group-icon">
              <input
                type="text"
                name="facebook"
                placeholder="Facebook URL"
                value={formData.facebook}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaFacebook />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>President Information</h4>
            <div className="input-group input-group-icon">
              <input
                type="text"
                name="presidentName"
                placeholder="President Name"
                value={formData.presidentName}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaUser />
              </div>
            </div>

            <div className="input-group input-group-icon">
              <input
                type="email"
                name="presidentEmail"
                placeholder="President Email"
                value={formData.presidentEmail}
                onChange={handleInputChange}
              />
              <div className="input-icon">
                <FaEnvelope />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="create-society-button-wrapper">
              <button 
                type="submit" 
                className="create-society-submit-button"
                disabled={loading}
              >
                {loading ? 'Creating Society...' : 'Create Society'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocietyCreationForm;