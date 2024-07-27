import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UserRegistration from './components/UserRegistration';
import Campaigns from './components/Campaigns';
import CreateCampaign from './components/CreateCampaign';

function App() {
  return (
    <Router>
      <div className="App bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<div>Welcome to MasChain Crowdfunding</div>} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
