import React from 'react';
import { Link } from 'react-router-dom';


const Greeting = ({ currentUser, logout, openModal }) => {
  const sessionLinks = () => (
    <div>
        <nav className="login-signup">
          {/* <Link to="/login">Sign In</Link> */}
          <button onClick={() => openModal('login')}>Sign in</button>
          &nbsp;or&nbsp;
          {/* <Link to="/signup">Join</Link> */}
          <button onClick={() => openModal('signup')}>Join</button>
        </nav>
    </div>
    
  );
  const personalGreeting = () => (
    <hgroup className="header-group">
      <div className='dropdown'>
        <button className="header-name">My Yollow</button>
        <div className='dropdown-content'>
          <a className="header-button" onClick={logout}>Log Out</a>
        </div>
      </div>
    </hgroup>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;


// user login pages and shows all the different part