import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../UserContext';
import { getConfig } from "../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const config = getConfig();

const CreateCampaign = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { walletAddress } = useUserContext();
    const { user } = useAuth0();
    const navigate = useNavigate();

    const validateForm = () => {
        if (!title || !description || !targetAmount || !startDate || !endDate) {
            toast.error("All fields are required!");
            return false;
        }
        if (new Date(startDate) > new Date(endDate)) {
            toast.error("End date must be after start date.");
            return false;
        }
        if (targetAmount <= 0) {
            toast.error("Target amount must be greater than zero.");
            return false;
        }
        return true;
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const category_ids = [5];
            const formData = new FormData();
            formData.append('wallet_address', walletAddress);
            formData.append('contract_address', config.MASCHAIN_CONTRACT_ADD);
            category_ids.forEach((id) => {
                formData.append('category_id[]', id);
            });
            formData.append('metadata', JSON.stringify({
                name: title,
                data: description,
                entity_id: walletAddress,
                target_amount: targetAmount,
                content: `Campaign target: ${targetAmount}, Start: ${startDate}, End: ${endDate}`
            }));
            formData.append('callback_url', 'https://your-callback-url.com');

            if (images.length > 0) {
                formData.append('file', images[0]);  // Only append the first image
            } else {
                toast.error("Image is required");
                return;
            }

            const response = await fetch(`${config.MASCHAIN_API_URL}/api/audit/audit`, {
                method: 'POST',
                headers: {
                    'client_id': config.MASCHAIN_API_KEY,
                    'client_secret': config.MASCHAIN_SECRET_KEY
                },
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("Campaign created successfully!");
                setTimeout(() => {
                    navigate('/my-campaigns');
                }, 3000);
            } else {
                toast.error(`Error: ${data.result}`);
            }
        } catch (error) {
            toast.error('Error creating campaign.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const fileList = Array.from(e.target.files);
        setImages(fileList);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg max-w-3xl">
            <ToastContainer />
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">Create Campaign</h2>
            <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Wallet Address:</label>
                        <input
                            type="text"
                            value={walletAddress}
                            readOnly
                            className="w-full px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-300"
                            placeholder="Enter campaign title"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-5">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Target Amount:</label>
                        <input
                            type="number"
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-300"
                            placeholder="Enter target amount"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-300"
                        />
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-300"
                        placeholder="Enter campaign description"
                    />
                </div>
                <div className="mb-5">
                    <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Upload Images:</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        multiple
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-blue-300"
                    />
                    <div className="mt-4 flex flex-wrap gap-4">
                        {images.map((url, index) => (
                            <img key={index} src={URL.createObjectURL(url)} alt={`Preview ${index + 1}`} className="h-32 w-32 object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900">
                    {loading ? <span className="loader"></span> : 'Create Campaign'}
                </button>
            </form>
        </div>
    );
};

export default CreateCampaign;
