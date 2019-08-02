import React from 'react';
import { Redirect } from 'react-router-dom'

class PropertyShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      close: false
    }
    this.closeShow = this.closeShow.bind(this);
  }

  closeShow() {
    this.setState({ close: true });
  }

  componentDidMount() {
    this.props.fetchProperty(this.props.match.params.propertyId)
  }

  render() {
    if (!this.props.property) return null
    const { address, baths, beds, ownerUsername, sale, rent, price, photoUrls } = this.props.property;
    return(
      
      <div className="show-container">
        <button
          onClick={this.closeShow}
          className='home-header-close'>X
          {this.state.close || !this.props.property.id ? <Redirect exact to='/properties' /> : ''}
        </button>

        <div className='image-show-container'>
          <img src={photoUrls} alt="" />
        </div>
      <div className="show-item-data-container">
        <div className='show-item-data'>
          <div>
            <span className="index-item-price"> ${price}</span>
          </div>
          <div>
            <span className="index-item-beds"> {beds} beds</span>
          </div>
          <div>
            <span className="index-item-beds"> {baths} baths</span>
          </div>
          <br />
        </div>
        <div>
          <span className="index-item-adress"> {address}</span>
        </div>
      </div>
        
        <div className='icon-container'>
          <ul className= 'icon'>
            <h3>Rental Facts and Features</h3>
            <li><i className="fas fa-building"></i>No Data</li>
            <li><i className="fas fa-calendar-alt"></i>Available Now</li>
            <li><i className="fas fa-fire"></i>No Data</li>
            <li><i className="fas fa-parking"></i>No Data</li>
          </ul>
        </div>

        <div className="container">
          <h3>Request Tour</h3>
          <form className='input-container'>
        <br/>
          <input type="text" placeholder="Your name.."/>
          <br/>
          
              <input type="text" placeholder="Your last name.."/>
          <br/>
          
              <input type="text" placeholder="Your number.."/>
          
          <br/>
          <input className="container-contact" type="submit" value="Send Request"/>
          </form>
   
        </div>
  </div>
    )
  }
}


export default PropertyShow

