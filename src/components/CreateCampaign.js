import React, { useState } from 'react';

const CampaignForm = () => {
    const [formData, setFormData] = useState({
        organization: '',
        reason: '',
        evidence: null,
    });
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'evidence') {
            setFormData({
                ...formData,
                [name]: files[0],
            });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log(formData);
    };

    return (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg mt-6 transform transition-all duration-300 hover:scale-105 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 clip-path-polygon"></div>
            <h2 className="text-3xl font-bold text-white mb-4 text-center relative z-10">Create a Campaign</h2>
            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                    <label className="block text-white font-medium">Organization Name</label>
                    <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white font-medium">Reason for Campaign</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-white font-medium">Evidence Photo</label>
                    <input
                        type="file"
                        name="evidence"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {preview && <img src={preview} alt="Evidence Preview" className="mt-2 rounded shadow-md" />}
                </div>
                <button
                    type="submit"
                    className="w-full bg-white text-blue-500 p-2 rounded mt-4 font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300"
                >
                    Submit Campaign
                </button>
            </form>
        </div>
    );
};

export default CampaignForm;
