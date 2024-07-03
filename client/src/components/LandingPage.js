// LandingPage.js
import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleClose = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div className="landing-page">
     <div className="landing-header">
       <h1>Welcome to AI Task Scheduler</h1>
      </div>
      <div className="landing-buttons">
        <button className="landing-button" onClick={() => { setShowLogin(true); setShowSignup(false); }}>Login</button>
        <button className="landing-button" onClick={() => { setShowSignup(true); setShowLogin(false); }}>Signup</button>
    </div>
      {showLogin && <div className="modal-backdrop"><div className="modal-content"><Login onClose={handleClose}/></div></div>}
      {showSignup && <div className="modal-backdrop"><div className="modal-content"><Signup onClose={handleClose} /></div></div>}
    </div>
  );
};

export default LandingPage;
