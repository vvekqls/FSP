import React from 'react';
import { Link } from 'react-router-dom';

const userSettings = (props) => {
  
  return (
    <div className='tooltip-container'>
      <ul className='user-settings'>
        <li><Link to='/savedproperties' className="header-button">Saved Homes</Link></li>
        <li><Link to='/' className="header-button" onClick={props.logout}>Log Out</Link></li>
      </ul>
    </div>
  );
};

export default userSettings;