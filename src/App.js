import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UserRegistration from './components/UserRegistration';
import Campaigns from './components/Campaigns';
import CreateCampaign from './components/CreateCampaign';
import Homepage from './components/HomePage';
import LoadingSpinner from './components/LoadingSpinner';


function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <LoadingSpinner />;

  return (
    <Router>
      <div className="App bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
