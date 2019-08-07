import React from 'react';
import { Link } from 'react-router-dom';
import UserSetting from './user_setting'


const Greeting = ({ currentUser, logout, openModal }) => {
  const sessionLinks = () => (
    <div>
        <nav className="login-signup">
          
          <button onClick={() => openModal('login')}>Sign in</button>
          &nbsp;or&nbsp;
          
          <button onClick={() => openModal('signup')}>Join</button>
        </nav>
    </div>
    
  );
  const personalGreeting = () => (
    <hgroup className="header-group">
      <div className='dropdown'>
        <button className="header-name">My Yollow</button>
        <UserSetting logout={logout}/>
      </div>
    </hgroup>
  );

  return currentUser ? personalGreeting(currentUser, logout) : sessionLinks();
};


export default Greeting;


// user login pages and shows all the different part