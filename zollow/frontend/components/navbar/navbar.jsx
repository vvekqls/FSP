import {Link} from 'react-router-dom'
import React from 'react'

class Navbar extends React.Component {
  render() {
    return (
      <div>
        <ul id="nav">
          <Link to='/'><li>Home</li></Link>
          <Link to='/properties'><li>Buy</li></Link>
          <Link to='/properties'><li>Rent</li></Link>
          <Link to='/sell'><li>Sell</li></Link>
          
        </ul>
      </div>
    );
  }
}

export default Navbar