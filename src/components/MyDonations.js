import React, { useEffect, useState } from 'react';
import { getConfig } from "../config";
import { useUserContext } from '../UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = getConfig();

const MyDonations = () => {
    const { walletAddress } = useUserContext();
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null); // Track which donation is expanded

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${config.MASCHAIN_API_URL}/api/token/get-token-transaction?filter=from&wallet_address=${walletAddress}&contract_address=${config.MASCHAIN_CONTRACT_ADD}`, {
                    method: 'GET',
                    headers: {
                        'client_id': config.MASCHAIN_API_KEY,
                        'client_secret': config.MASCHAIN_SECRET_KEY,
                        'content-type': 'application/json'
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setDonations(data.result);
                } else {
                    setError(`Error fetching donations: ${data.error}`);
                }
            } catch (error) {
                setError('Error fetching donations.');
            } finally {
                setLoading(false);
            }
        };

        if (walletAddress) {
            fetchDonations();
        }
    }, [walletAddress]);

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="loader">Loading...</div></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-64"><p className="text-xl text-red-600">{error}</p></div>;
    }

    return (
        <div className="container mx-auto p-6 rounded-lg max-w-screen-lg">
            <ToastContainer />
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">My Donations</h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                {donations.length > 0 ? (
                    <ul>
                        {donations.map((donation, index) => (
                            <li key={index} className="p-4 rounded-lg mb-4 bg-gray-100 dark:bg-gray-900 shadow-md">
                                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(index)}>
                                    <div>
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">To:</span>
                                        <span className="ml-2 text-blue-600 dark:text-blue-400">{donation.to}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Amount:</span>
                                        <span className="ml-2 text-blue-600 dark:text-blue-400">{(parseFloat(donation.amount) / Math.pow(10, donation.decimal)).toFixed(2)} {donation.token.symbol}</span>
                                    </div>
                                    <button className="text-blue-600 dark:text-blue-400">
                                        {expandedIndex === index ? 'Hide Details' : 'Show Details'}
                                    </button>
                                </div>
                                {expandedIndex === index && (
                                    <div className="mt-4">
                                        <div className="mb-2">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">From:</span>
                                            <span className="ml-2 text-blue-600 dark:text-blue-400">{donation.from}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">Transaction Hash:</span>
                                            <span className="ml-2 text-gray-500 dark:text-gray-400">{donation.transactionHash}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">Block Number:</span>
                                            <span className="ml-2 text-gray-500 dark:text-gray-400">{donation.blockNumber}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">Method:</span>
                                            <span className="ml-2 text-gray-500 dark:text-gray-400">{donation.method}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">Token Name:</span>
                                            <span className="ml-2 text-gray-500 dark:text-gray-400">{donation.token.name}</span>
                                        </div>
                                        <div className="mb-2">
                                            <span className="font-semibold text-gray-700 dark:text-gray-300">Timestamp:</span>
                                            <span className="ml-2 text-gray-500 dark:text-gray-400">{new Date(donation.timestamp).toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">No donations made yet.</p>
                )}
            </div>
        </div>
    );
};

export default MyDonations;
