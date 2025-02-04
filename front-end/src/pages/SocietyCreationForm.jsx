// SocietyCreationForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaInstagram, FaUser, FaEnvelope, FaImage } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "../styles/society-creation.css";
import { endpoints } from "../services/api";

const SocietyCreationForm = () => {
	const navigate = useNavigate();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		instagram: "",
		x: "",
		presidentName: "",
		presidentMail: "",
		numberOfFollowers: 0,
	});

	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const validateForm = () => {
		if (!formData.name.trim()) return "Society name is required";
		if (!formData.description.trim()) return "Description is required";
		if (!formData.presidentName.trim()) return "President name is required";
		if (!formData.presidentMail.trim()) return "President email is required";

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.presidentMail)) {
			return "Invalid email format";
		}

		const urlRegex = /^https?:\/\/.+/;
		if (formData.instagram && !urlRegex.test(formData.instagram)) {
			return "Instagram URL must be valid";
		}
		if (formData.x && !urlRegex.test(formData.x)) {
			return "X URL must be valid";
		}

		return "";
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		setError("");
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 800 * 1024) {
				setError("Image size should be less than 800KB");
				return;
			}

			setImageFile(file);

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
			// Prepare the society data exactly as required by the backend
			const societyData = {
				name: formData.name,
				description: formData.description,
				instagram: formData.instagram || "string", // Provide a default if empty
				x: formData.x || "string", // Provide a default if empty
				presidentName: formData.presidentName,
				presidentMail: formData.presidentMail,
				numberOfFollowers: 0,
			};

			// Uncomment and modify image upload logic when backend supports it
			/*
      if (imageFile) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('image', imageFile);
        const imageResponse = await endpoints.uploadImage(formDataWithImage);
        societyData.logo = imageResponse.data.url;
      }
      */

			const response = await endpoints.createSociety(societyData);
			console.log("Society created successfully:", response.data);
			navigate("/societies");
		} catch (err) {
			setError(err.response?.data?.message || "Failed to create society. Please try again.");
			console.error("Error creating society:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="society-creation-page">
			<div className="event-creation-container">
				{error && (
					<div className="error-message" style={{ color: "red", marginBottom: "1rem" }}>
						{error}
					</div>
				)}
				<form onSubmit={handleSubmit}>
					<div className="form-section">
						<h4>Society Details</h4>

						<div className="input-group input-group-icon">
							<input
								type="text"
								name="name"
								placeholder="Society Name"
								value={formData.name}
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
								name="presidentMail"
								placeholder="President Email"
								value={formData.presidentMail}
								onChange={handleInputChange}
							/>
							<div className="input-icon">
								<FaEnvelope />
							</div>
						</div>
					</div>

					<div className="form-section">
						<div className="create-society-button-wrapper">
							<button type="submit" className="create-society-submit-button" disabled={loading}>
								{loading ? "Creating Society..." : "Create Society"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SocietyCreationForm;
