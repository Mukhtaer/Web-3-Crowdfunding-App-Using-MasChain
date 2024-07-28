import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faCopy } from '@fortawesome/free-solid-svg-icons';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useUserContext } from '../UserContext';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);
    const { isAuthenticated, user } = useAuth0();
    const { walletAddress } = useUserContext();
    const location = useLocation();

    useEffect(() => {
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Wallet address copied to clipboard');
    };

    return (
        <header className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 shadow-md dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                    <span className="text-2xl font-semibold text-white">DonateChain</span>
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/" className={`text-white hover:text-gray-200 ${location.pathname === '/' && 'font-bold'}`}>Home</Link>
                    <Link to="/campaigns" className={`text-white hover:text-gray-200 ${location.pathname === '/campaigns' && 'font-bold'}`}>Campaigns</Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/create-campaign" className={`text-white hover:text-gray-200 ${location.pathname === '/create-campaign' && 'font-bold'}`}>Create Campaign</Link>
                            <Link to="/my-campaigns" className={`text-white hover:text-gray-200 ${location.pathname === '/my-campaigns' && 'font-bold'}`}>My Campaigns</Link>
                            <Link to="/my-donations" className={`text-white hover:text-gray-200 ${location.pathname === '/my-donations' && 'font-bold'}`}>My Donations</Link>
                        </>
                    )}
                </nav>
                <div className="flex items-center space-x-3">
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-3">
                            <img src={user.picture} alt={user.name} className="h-8 w-8 rounded-full" />
                            <span className="text-white hidden sm:block">{user.name}</span>
                            {walletAddress && (
                                <div className="flex items-center space-x-2">
                                    <span className="text-white hidden sm:block">
                                        Wallet: {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faCopy}
                                        className="text-white cursor-pointer"
                                        onClick={() => copyToClipboard(walletAddress)}
                                    />
                                </div>
                            )}
                            <LogoutButton />
                        </div>
                    ) : (
                        <LoginButton />
                    )}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
                    >
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
