import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { getConfig } from "./config";
import { createUserWallet, fetchUserWallet } from './MasChainApi';

const config = getConfig();

const onRedirectCallback = (appState) => {
  console.log("Finish");
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const fetchUserMetadata = async (userId, token) => {
  const response = await fetch(`${config.AUTH0_DOMAIN}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user metadata: ${response.statusText}`);
  }

  const userData = await response.json();
  return userData.user_metadata;
};

const updateAuth0UserProfile = async (userId, walletAddress, token) => {
  try {
    const response = await fetch(`${config.AUTH0_DOMAIN}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.token}`
      },
      body: JSON.stringify({
        user_metadata: {
          wallet_address: walletAddress
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to update user profile: ${response.statusText}`);
    }

    const updatedUser = await response.json();
    console.log('Updated user profile:', updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
  }
};

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [walletAddress, setWalletAddress] = React.useState('');

  React.useEffect(() => {
    const handleUserLogin = async () => {
      if (isAuthenticated && user) {
        const token = await getAccessTokenSilently();
        let userMetadata = await fetchUserMetadata(user.sub, token);
        let walletAddress = userMetadata?.wallet_address || '';

        if (!walletAddress) {
          const walletData = await createUserWallet(user, token);
          if (walletData && walletData.result.wallet) {
            walletAddress = walletData.result.wallet.wallet_address;
            await updateAuth0UserProfile(user.sub, walletAddress, token);
          }
        } else {
          const walletData = await fetchUserWallet(user.sub, walletAddress);
          console.log("Existing Wallet Data: ", walletData);
        }

        setWalletAddress(walletAddress);
      }
    };

    handleUserLogin();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return React.cloneElement(children, { walletAddress });
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </Auth0Provider>
  </React.StrictMode>
);

reportWebVitals();
