import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConfig } from "../config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../UserContext';

const config = getConfig();

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { walletAddress } = useUserContext();
    const [donationHistory, setDonationHistory] = useState([]);
    const [totalDonated, setTotalDonated] = useState(0);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${config.MASCHAIN_API_URL}/api/audit/audit/${id}`, {
                    method: 'GET',
                    headers: {
                        'client_id': config.MASCHAIN_API_KEY,
                        'client_secret': config.MASCHAIN_SECRET_KEY
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setCampaign(data.result);
                } else {
                    setError(`Error: ${data.error}`);
                }
            } catch (error) {
                setError('Error fetching campaign details.');
            } finally {
                setLoading(false);
            }
        };

        const fetchDonations = async () => {
            try {
                const response = await fetch(`${config.MASCHAIN_API_URL}/api/audit/audit?category=6`, {
                    method: 'GET',
                    headers: {
                        'client_id': config.MASCHAIN_API_KEY,
                        'client_secret': config.MASCHAIN_SECRET_KEY
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    const donations = data.result.filter(donation => {
                        const donationMetadata = JSON.parse(donation.metadata || '{}');
                        return donationMetadata.campaign_id === id;
                    });
                    setDonationHistory(donations);
                    const total = donations.reduce((sum, donation) => {
                        const donationData = JSON.parse(donation.metadata || '{}');
                        const amount = parseFloat(donationData.amount) || 0;
                        return sum + amount;
                    }, 0);
                    setTotalDonated(total);
                } else {
                    toast.error(`Error fetching donations: ${data.error}`);
                }
            } catch (error) {
                toast.error('Error fetching donations.');
            }
        };

        fetchCampaign();
        fetchDonations();
    }, [id]);

    const handleDonate = async () => {
        if (!campaign) return;

        const donationAmount = prompt("Enter the amount to donate:");
        if (!donationAmount) return;

        try {
            const formData = new FormData();
            formData.append('wallet_address', walletAddress);
            formData.append('to', JSON.parse(campaign.metadata).entity_id);
            formData.append('amount', donationAmount);
            formData.append('contract_address', config.MASCHAIN_CONTRACT_ADD);
            formData.append('callback_url', 'https://your-callback-url.com');

            const response = await fetch(`${config.MASCHAIN_API_URL}/api/token/token-transfer`, {
                method: 'POST',
                headers: {
                    'client_id': config.MASCHAIN_API_KEY,
                    'client_secret': config.MASCHAIN_SECRET_KEY
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                toast.success("Donation successful!");

                const auditData = new FormData();
                auditData.append('category_id[]', 6);
                auditData.append('contract_address', config.MASCHAIN_CONTRACT_AUDIT);
                auditData.append('wallet_address', walletAddress);
                auditData.append('metadata', JSON.stringify({
                    to: JSON.parse(campaign.metadata).entity_id,
                    amount: donationAmount,
                    campaign_id: id,
                    from: walletAddress,
                }));
                auditData.append('callback_url', 'https://your-callback-url.com');

                await fetch(`${config.MASCHAIN_API_URL}/api/audit/audit`, {
                    method: 'POST',
                    headers: {
                        'client_id': config.MASCHAIN_API_KEY,
                        'client_secret': config.MASCHAIN_SECRET_KEY
                    },
                    body: auditData,
                });

                setDonationHistory([...donationHistory, { metadata: JSON.stringify({ amount: donationAmount, from: walletAddress, transactionHash: data.result.content }) }]);
                setTotalDonated(prevTotal => prevTotal + parseFloat(donationAmount));
            } else {
                toast.error(`Error: ${data.result}`);
            }
        } catch (error) {
            toast.error('Error processing donation.');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="loader">Loading...</div></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-64"><p className="text-xl text-red-600">{error}</p></div>;
    }

    const metadata = campaign ? JSON.parse(campaign.metadata) : {};
    const targetAmount = parseFloat(metadata.target_amount) || 1; // Prevent division by zero
    const donationProgress = (totalDonated / targetAmount) * 100;

    return (
        <div className="container mx-auto p-6 rounded-lg max-w-screen-lg">
            <ToastContainer />
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">{metadata.name}</h2>
            <div className="mb-6">
                <img src={campaign.file || 'http://dummy-images.com/abstract/dummy-454x280-White.jpg'} alt="Campaign" className="w-full h-64 object-cover rounded-lg shadow-md" />
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Campaign Details</h3>
                <div className="relative w-full bg-gray-300 dark:bg-gray-600 h-1  mb-3 rounded-full overflow-hidden mt-2">
                    <div
                        className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-700"
                        style={{ width: `${donationProgress}%` }}
                    ></div>
                </div>
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Description:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{metadata.data}</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Target Amount:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{metadata.target_amount}</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Creator:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{metadata.entity_id}</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Raised Amount:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{totalDonated}</p>
                </div>
                <button
                    onClick={handleDonate}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
                >
                    Donate
                </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Donators</h3>
                {donationHistory.length > 0 ? (
                    <ul>
                        {donationHistory.map((donation, index) => {
                            const donationData = JSON.parse(donation.metadata);
                            return (
                                <li key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-2">
                                    <span className="text-gray-800 dark:text-gray-200 font-semibold">{donationData.from}</span>
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold">{donationData.amount} Tokens</span>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No donations made yet.</p>
                )}
            </div>
        </div>
    );
};

export default CampaignDetails;
