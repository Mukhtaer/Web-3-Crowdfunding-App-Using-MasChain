import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Initialize dark mode based on the user's previous setting
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedMode);
        document.documentElement.classList.toggle('dark', savedMode);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', newMode);
        document.documentElement.classList.toggle('dark', newMode);
    };

    return (
        <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 shadow-lg dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                    <span className="text-2xl font-semibold text-white">Crowdfunding MasChain</span>
                </Link>
                <nav className="flex items-center space-x-6">
                    <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                    <Link to="/register" className="text-white hover:text-gray-200">Register</Link>
                    <Link to="/campaigns" className="text-white hover:text-gray-200">View Campaigns</Link>
                    <Link to="/create-campaign" className="text-white hover:text-gray-200">Create Campaign</Link>
                </nav>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
                    >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
