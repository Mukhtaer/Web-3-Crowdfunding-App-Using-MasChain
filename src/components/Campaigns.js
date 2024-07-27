import React, { useState, useEffect } from 'react';

const ViewCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                // Replace with your API endpoint
                const response = await fetch('http://localhost:5000/api/campaigns');
                const data = await response.json();
                setCampaigns(data);
            } catch (error) {
                setError('Error fetching campaigns');
            }
        };

        fetchCampaigns();
    }, []);

    const handleDonate = (id) => {
        // Handle the donation logic here
        console.log(`Donate to campaign ID: ${id}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-4 text-center">Campaigns</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 clip-path-polygon"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold text-white">{campaign.title}</h3>
                            <p className="text-white">{campaign.description}</p>
                            <p className="text-white mt-2">Organization: {campaign.organization}</p>
                            {campaign.evidence && (
                                <img src={campaign.evidence} alt="Evidence" className="mt-2 rounded shadow-md" />
                            )}
                            <button
                                onClick={() => handleDonate(campaign.id)}
                                className="w-full bg-white text-blue-500 p-2 rounded mt-4 font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300"
                            >
                                Donate
                            </button>
                        </div>
                    </div>
                ))}
                {/* Sample Card for Demo Purposes */}
                <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 clip-path-polygon"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white">Sample Campaign</h3>
                        <p className="text-white">This is a description of the sample campaign. It provides an example of how campaign details are displayed.</p>
                        <p className="text-white mt-2">Organization: Sample Organization</p>
                        <img src="https://via.placeholder.com/150" alt="Evidence" className="mt-2 rounded shadow-md" />
                        <button
                            onClick={() => handleDonate('sample-id')}
                            className="w-full bg-white text-blue-500 p-2 rounded mt-4 font-bold hover:bg-blue-500 hover:text-white transition-colors duration-300"
                        >
                            Donate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCampaigns;
