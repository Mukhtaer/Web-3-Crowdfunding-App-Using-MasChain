// LogoutButton.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({ returnTo: window.location.origin })} className="bg-red-600 text-white p-2 rounded">
            Log Out
        </button>
    );
};

export default LogoutButton;
