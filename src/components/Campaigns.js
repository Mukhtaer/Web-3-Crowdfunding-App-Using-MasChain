import React, { useState, useEffect } from 'react';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/campaigns');
                const data = await response.json();
                setCampaigns(data);
            } catch (error) {
                setError('Error fetching campaigns');
            }
        };

        fetchCampaigns();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-4">
                {campaigns.map((campaign) => (
                    <li key={campaign.id} className="bg-white p-4 rounded shadow-md">
                        <h3 className="text-xl font-bold">{campaign.title}</h3>
                        <p>{campaign.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Campaigns;
