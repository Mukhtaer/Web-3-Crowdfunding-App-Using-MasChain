import React from 'react';

const Homepage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to MasChain Crowdfunding</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
                MasChain Crowdfunding is a platform that allows users to support innovative projects and ideas using blockchain technology.
                Explore campaigns, donate, or create your own project to start raising funds.
            </p>
            <div className="mt-6">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                    Explore Campaigns
                </button>
            </div>
        </div>
    );
};

export default Homepage;