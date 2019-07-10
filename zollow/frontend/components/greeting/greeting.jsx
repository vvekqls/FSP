import React from 'react';
import { Link } from 'react-router-dom';


const Greeting = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <div>
        <nav className="login-signup">
          <Link to="/login">Sign In</Link>
          &nbsp;or&nbsp;
          <Link to="/signup">Join</Link>
          <Link to="/properties">properties</Link>
        </nav>
    </div>
    
  );
  const personalGreeting = () => (
    <hgroup className="header-group">
      <h2 className="header-name">Hi, {currentUser.username}!</h2>
      <button className="header-button" onClick={logout}>Log Out</button>
    </hgroup>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;


// user login pages and shows all the different part