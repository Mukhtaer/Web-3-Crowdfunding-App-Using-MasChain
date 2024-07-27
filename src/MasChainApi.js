
import { getConfig } from "./config";

const config = getConfig();

const apiUrl = config.MASCHAIN_API_URL;
const clientId = config.MASCHAIN_API_KEY;
const clientSecret = config.MASCHAIN_SECRET_KEY;

export const createUserWallet = async (user, token) => {
    // Replace with your MasChain API endpoint and payload
    const response = await fetch(`${apiUrl}/api/wallet/create-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'client_id': clientId,
            'client_secret': clientSecret
        },
        body: JSON.stringify({
            email: user.email,
            name: user.name,
            auth0_id: user.sub
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create wallet');
    }

    const walletData = await response.json();
    return walletData;
};

export const fetchUserWallet = async (auth0Id, walletAddress) => {
    const response = await fetch(`${apiUrl}/api/wallet/wallet/${walletAddress}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'client_id': clientId,
            'client_secret': clientSecret
        }
    });

    if (!response.ok) {
        return null;
    }


    const walletData = await response.json();
    return walletData;
};




