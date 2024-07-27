import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [walletAddress, setWalletAddress] = useState('');

    return (
        <UserContext.Provider value={{ user, setUser, walletAddress, setWalletAddress }}>
            {children}
        </UserContext.Provider>
    );
};
