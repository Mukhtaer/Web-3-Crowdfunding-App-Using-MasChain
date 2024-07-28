import React, { useState, useEffect } from 'react';
import { getConfig } from "../config";
import { useUserContext } from '../UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const config = getConfig();

const ViewCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const { walletAddress } = useUserContext();

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.MASCHAIN_API_URL}/api/audit/audit?category=5`, {
                method: 'GET',
                headers: {
                    'client_id': config.MASCHAIN_API_KEY,
                    'client_secret': config.MASCHAIN_SECRET_KEY
                }
            });
            const data = await response.json();
            if (response.ok) {
                // Sort campaigns by creation date in descending order
                const sortedCampaigns = data.result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setCampaigns(sortedCampaigns);
            } else {
                toast.error(`Error fetching campaigns: ${data.error}`);
            }
        } catch (error) {
            toast.error('Error fetching campaigns.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6  rounded-lg  max-w-screen-xl">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">View Campaigns</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader"></div>
                </div>
            ) : campaigns.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl text-gray-600 dark:text-gray-400">No campaigns available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => {
                        const metadata = JSON.parse(campaign.metadata || '{}');
                        return (
                            <div key={campaign.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                <img
                                    src={campaign.file || 'http://dummy-images.com/abstract/dummy-454x280-White.jpg'}
                                    alt="Campaign"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                                        {metadata.name}
                                    </h3>
                                    <p className='text-sm  text-gray-800 dark:text-gray-200'>
                                        CREATOR: {metadata.entity_id}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {metadata.content}
                                    </p>
                                    <Link to={`/campaign-details/${campaign.transactionHash}`} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900">
                                        Donate
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ViewCampaigns;
