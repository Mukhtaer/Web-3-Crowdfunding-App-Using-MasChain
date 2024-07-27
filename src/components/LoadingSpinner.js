// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';
const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50">
            <div className="loader"></div>
        </div>
    );
};

export default LoadingSpinner;

