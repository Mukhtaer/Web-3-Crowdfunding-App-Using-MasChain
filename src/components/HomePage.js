import React from 'react';

const Homepage = () => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center bg-cover bg-center bg-gray-100 dark:bg-gray-900" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0')" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-800 dark:to-blue-700 opacity-80"></div>
            <div className="relative z-10 text-gray-900 dark:text-gray-200">
                <h1 className="text-5xl font-extrabold mb-4 animate-fade-in">
                    Welcome to MasChain Crowdfunding
                </h1>
                <p className="text-xl max-w-xl mx-auto mb-8 animate-fade-in delay-100">
                    Empower your ideas with the power of MasChain. Discover innovative Campaigns to help others or start your own campaign funding journey today. Do the campaign and let us find sponsors and donors for you!!
                </p>
                <div className="space-x-4">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 dark:bg-blue-800 dark:hover:bg-blue-900">
                        Explore Campaigns
                    </button>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105 dark:bg-green-800 dark:hover:bg-green-900">
                        Start a Campaign now with our platform! 🎉😊
                    </button>
                </div>
            </div>
            <div className="relative z-10 mt-16 w-full px-8 md:px-16">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-200">
                    Why Choose Us?
                </h2>
                <div className="flex flex-wrap justify-around gap-6 text-left">
                    <div className="max-w-xs p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-500 text-white dark:from-purple-800 dark:to-blue-700 dark:text-gray-200 dark:shadow-secondary">
                        <h3 className="text-xl font-bold mb-2">Secure & Transparent</h3>
                        <p>Our platform ensures secure transactions and transparent fund management through MasChainchain technology.</p>
                    </div>
                    <div className="max-w-xs p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-500 text-white dark:from-purple-800 dark:to-blue-700 dark:text-gray-200 dark:shadow-secondary">
                        <h3 className="text-xl font-bold mb-2">Innovative Projects</h3>
                        <p>Discover and support a wide range of creative and innovative campaigns led by passionate advocates. <br /> Let your name counts in the camapign!!</p>
                    </div>
                    <div className="max-w-xs p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-500 text-white dark:from-purple-800 dark:to-blue-700 dark:text-gray-200 dark:shadow-secondary">
                        <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                        <p>Join a community of like-minded individuals who are committed to making a positive impact through funding and supporting others.</p>
                    </div>
                </div>
            </div>
            <footer className="relative z-10 mt-16 bg-gray-800 text-white py-8 w-full text-center">
                <p>&copy; 2024 DonateChain. All rights reserved.</p>
                <div className="mt-4">
                    <a href="/" className="text-blue-400 hover:text-blue-500 mx-2">Privacy Policy</a>
                    <a href="/" className="text-blue-400 hover:text-blue-500 mx-2">Terms of Service</a>
                    <a href="/" className="text-blue-400 hover:text-blue-500 mx-2">Contact Us</a>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;