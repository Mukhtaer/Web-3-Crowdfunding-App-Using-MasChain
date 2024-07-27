import React from 'react';

const Homepage = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center bg-cover bg-center dark:bg-gray-900" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-800 dark:to-blue-700 opacity-75"></div>
            <div className="relative z-10 text-white dark:text-gray-200">
                <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">Welcome to MasChain Crowdfunding</h1>
                <p className="text-xl max-w-xl mx-auto mb-8 animate-fade-in delay-100">
                    MasChain Crowdfunding is a platform that allows users to support innovative projects and ideas using blockchain technology.
                    Explore campaigns, donate, or create your own project to start raising funds.
                </p>
                <div className="space-x-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-transform transform hover:scale-105">
                        Explore Campaigns
                    </button>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900 transition-transform transform hover:scale-105">
                        Start a Campaign
                    </button>
                </div>
            </div>
            <div className="relative z-10 mt-16">
                <h2 className="text-3xl font-bold mb-6 text-white dark:text-gray-200">Featured Campaigns</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Sample campaign cards */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 dark:shadow-secondary">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Campaign 1</h3>
                        <p className="text-gray-700 dark:text-gray-300">Brief description of the campaign...</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 dark:shadow-secondary">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Campaign 2</h3>
                        <p className="text-gray-700 dark:text-gray-300">Brief description of the campaign...</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 dark:shadow-secondary">
                        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">Campaign 3</h3>
                        <p className="text-gray-700 dark:text-gray-300">Brief description of the campaign...</p>
                    </div>
                </div>
            </div>
            <div className="relative z-10 mt-16">
                <h2 className="text-3xl font-bold mb-6 text-white dark:text-gray-200">Testimonials</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Sample testimonials */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 dark:shadow-secondary">
                        <p className="text-gray-700 dark:text-gray-300">"This platform has transformed the way we fund our projects!"</p>
                        <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">- User 1</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 dark:shadow-secondary">
                        <p className="text-gray-700 dark:text-gray-300">"I was able to gather support for my project quickly and efficiently."</p>
                        <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">- User 2</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 dark:shadow-secondary">
                        <p className="text-gray-700 dark:text-gray-300">"Amazing platform with great features for campaign creators."</p>
                        <p className="mt-2 font-bold text-gray-900 dark:text-gray-100">- User 3</p>
                    </div>
                </div>
            </div>
            <footer className="relative z-10 mt-16 bg-gray-800 text-white py-8 w-full text-center">
                <p>&copy; 2024 MasChain Crowdfunding. All rights reserved.</p>
                <div className="mt-4">
                    <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Privacy Policy</a>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Terms of Service</a>
                    <a href="#" className="text-blue-400 hover:text-blue-500 mx-2">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
