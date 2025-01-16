import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { endpoints } from '../services/api';  // Import yolunu değiştirdik

const ManageSocietyPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [society, setSociety] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        contactEmail: '',
        socialMediaLinks: {
            instagram: '',
            twitter: '',
            linkedin: ''
        }
    });

    useEffect(() => {
        const fetchSociety = async () => {
            try {
                const response = await endpoints.getSociety(id);
                setSociety(response.data);
                setFormData({
                    name: response.data.name || '',
                    description: response.data.description || '',
                    category: response.data.category || '',
                    contactEmail: response.data.contactEmail || '',
                    socialMediaLinks: {
                        instagram: response.data.socialMediaLinks?.instagram || '',
                        twitter: response.data.socialMediaLinks?.twitter || '',
                        linkedin: response.data.socialMediaLinks?.linkedin || ''
                    }
                });
            } catch (error) {
                console.error('Error fetching society:', error);
            }
        };

        fetchSociety();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('social-')) {
            const platform = name.replace('social-', '');
            setFormData(prev => ({
                ...prev,
                socialMediaLinks: {
                    ...prev.socialMediaLinks,
                    [platform]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await endpoints.updateSociety(id, formData);
            setIsEditing(false);
            // Refresh society data
            const response = await endpoints.getSociety(id);
            setSociety(response.data);
        } catch (error) {
            console.error('Error updating society:', error);
        }
    };

    if (!society) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md max-w-4xl mx-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Manage Society</h1>
                        {!isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Edit Details
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Society Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded h-32"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={formData.contactEmail}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-4">Social Media Links</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Instagram
                                        </label>
                                        <input
                                            type="url"
                                            name="social-instagram"
                                            value={formData.socialMediaLinks.instagram}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Twitter
                                        </label>
                                        <input
                                            type="url"
                                            name="social-twitter"
                                            value={formData.socialMediaLinks.twitter}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            LinkedIn
                                        </label>
                                        <input
                                            type="url"
                                            name="social-linkedin"
                                            value={formData.socialMediaLinks.linkedin}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 border rounded hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{society.name}</h2>
                                <p className="text-gray-600">{society.description}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2">Category</h3>
                                <p>{society.category}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium mb-2">Contact</h3>
                                <p>{society.contactEmail}</p>
                            </div>
                            {society.socialMediaLinks && (
                                <div>
                                    <h3 className="text-lg font-medium mb-2">Social Media</h3>
                                    <div className="space-y-2">
                                        {society.socialMediaLinks.instagram && (
                                            <p>Instagram: {society.socialMediaLinks.instagram}</p>
                                        )}
                                        {society.socialMediaLinks.twitter && (
                                            <p>Twitter: {society.socialMediaLinks.twitter}</p>
                                        )}
                                        {society.socialMediaLinks.linkedin && (
                                            <p>LinkedIn: {society.socialMediaLinks.linkedin}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageSocietyPage;