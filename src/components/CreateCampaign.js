// CreateCampaign.js
import React, { useState } from 'react';

<<<<<<< HEAD
const CreateCampaign = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
=======
const CampaignForm = () => {
    const [formData, setFormData] = useState({
        organization: '',
        reason: '',
        evidence: null,
        targetAmount: '',
        timeFrame: '',
    });
    const [preview, setPreview] = useState(null);
>>>>>>> fe40217f8fb3d4e20a61e05d542c9cad18cddb0f

    const handleCreate = async (e) => {
        e.preventDefault();
        setMessage('Creating campaign...');
        try {
            const response = await fetch('http://localhost:5000/api/campaigns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, price, images }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(`Campaign created: ${data.title}`);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage('Error creating campaign.');
        }
    };

    const handleImageChange = (e) => {
        const fileList = Array.from(e.target.files);
        setImages(fileList.map(file => URL.createObjectURL(file)));
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-center mb-6">Create Campaign</h2>
            <form onSubmit={handleCreate} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Price Goal:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Upload Images:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        multiple
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <div className="mt-4 flex flex-wrap gap-4">
                        {images.map((url, index) => (
                            <img key={index} src={url} alt={`Preview ${index + 1}`} className="h-32 w-32 object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                </div>
<<<<<<< HEAD
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
                    Create Campaign
=======
                <div>
                    <label className="block text-white font-medium">Target Amount (USD)</label>
                    <input
                        type="number"
                        name="targetAmount"
                        value={formData.targetAmount}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white font-medium">Time Frame (e.g., 6 months)</label>
                    <input
                        type="text"
                        name="timeFrame"
                        value={formData.timeFrame}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-blue-500 p-2 rounded mt-4 font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300"
                >
                    Submit Campaign
>>>>>>> fe40217f8fb3d4e20a61e05d542c9cad18cddb0f
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default CreateCampaign;
