import React from 'react';

const Homepage = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10">
                <h1 className="text-5xl font-extrabold mb-4 text-white">Welcome to MasChain Crowdfunding</h1>
                <p className="text-xl text-gray-200 max-w-xl mx-auto mb-8">
                    MasChain Crowdfunding is a platform that allows users to support innovative projects and ideas using blockchain technology.
                    Explore campaigns, donate, or create your own project to start raising funds.
                </p>
                <div className="space-x-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                        Explore Campaigns
                    </button>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
                        Start a Campaign
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
