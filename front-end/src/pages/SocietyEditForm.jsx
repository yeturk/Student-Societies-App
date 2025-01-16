import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { endpoints } from "../services/api";
import "../styles/society-form.css";

function SocietyEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        presidentName: "",
        presidentMail: "",
        instagram: "",
        x: "", // Twitter/X
        questions: [{ question: "", answer: "" }]
    });

    useEffect(() => {
        fetchSocietyDetails();
    }, [id]);

    const checkPermission = () => {
        // Admin her kulübü düzenleyebilir
        if (user?.role === 'admin') return true;
        
        // Kulüp lideri kendi kulübünü düzenleyebilir
        return user?.role === 'society-leader' && user?.id === id;
    };

    const fetchSocietyDetails = async () => {
        try {
            setLoading(true);
            const { data } = await endpoints.getSociety(id);
            setFormData({
                name: data.name || "",
                description: data.description || "",
                presidentName: data.presidentName || "",
                presidentMail: data.presidentMail || "",
                instagram: data.instagram || "",
                x: data.x || "",
                questions: data.questions?.length > 0 
                    ? data.questions 
                    : [{ question: "", answer: "" }]
            });
            setError(null);
        } catch (err) {
            console.error("Error fetching society details:", err);
            setError("Failed to load society details. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            questions: updatedQuestions
        }));
    };

    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, { question: "", answer: "" }]
        }));
    };

    const removeQuestion = (index) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!checkPermission()) {
            setError("You don't have permission to edit this society.");
            return;
        }

        try {
            // Request body'yi API'nin beklediği formatta hazırla
            const societyData = {
                id: parseInt(id),  // API integer bekliyor
                name: formData.name,
                description: formData.description,
                instagram: formData.instagram,
                x: formData.x,
                presidentName: formData.presidentName,
                presidentMail: formData.presidentMail,
                numberOfFollowers: formData.numberOfFollowers || 0
            };

            await endpoints.updateSociety(id, societyData);
            navigate(`/societies/${id}`);
        } catch (err) {
            console.error("Error updating society:", err);
            setError("Failed to update society. Please try again.");
        }
    };

    if (loading) {
        return <div className="loading">Loading society details...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">{error}</p>
                <button onClick={fetchSocietyDetails} className="retry-button">
                    Try Again
                </button>
            </div>
        );
    }

    if (!checkPermission()) {
        return (
            <div className="error-container">
                <p className="error-message">You don't have permission to edit this society.</p>
                <button onClick={() => navigate(`/societies/${id}`)} className="retry-button">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="society-form-container">
            <h1>Edit Society</h1>
            <form onSubmit={handleSubmit} className="society-form">
                <div className="form-group">
                    <label htmlFor="name">Society Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="presidentName">President Name</label>
                    <input
                        type="text"
                        id="presidentName"
                        name="presidentName"
                        value={formData.presidentName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="presidentMail">President Email</label>
                    <input
                        type="email"
                        id="presidentMail"
                        name="presidentMail"
                        value={formData.presidentMail}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="instagram">Instagram Link</label>
                    <input
                        type="url"
                        id="instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="x">X (Twitter) Link</label>
                    <input
                        type="url"
                        id="x"
                        name="x"
                        value={formData.x}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="questions-section">
                    <h3>FAQ Section</h3>
                    {formData.questions.map((q, index) => (
                        <div key={index} className="question-group">
                            <div className="form-group">
                                <label>Question {index + 1}</label>
                                <input
                                    type="text"
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Answer {index + 1}</label>
                                <textarea
                                    value={q.answer}
                                    onChange={(e) => handleQuestionChange(index, "answer", e.target.value)}
                                />
                            </div>
                            {formData.questions.length > 1 && (
                                <button
                                    type="button"
                                    className="remove-question-button"
                                    onClick={() => removeQuestion(index)}
                                >
                                    Remove Question
                                </button>
                            )}
                        </div>
                    ))}
                    <button 
                        type="button" 
                        className="add-question-button"
                        onClick={addQuestion}
                    >
                        Add Question
                    </button>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate(`/societies/${id}`)} className="cancel-button">
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SocietyEditForm;