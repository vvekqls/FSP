import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import PropertyShowContainer from '../property_show/property_show_container';

class PropertyIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const propertyId = this.props.property.id;
    this.props.history.push(`/properties/${propertyId}`);
  }

  render() {
    const { address, price, rent, sale, beds, baths, photoUrls} = this.props.property
    return (
      
        <li className="index-item">
          <div
            className="grid-container"
            onClick={this.handleClick}>
            <div className='image-container'>
              <img className='image-grid' src={photoUrls} alt="" />
            </div>
            <div className='index-item-data'>
              <span className="index-item-price"> ${price}</span>
              <span className="index-item-beds"> {beds} beds</span>
              <span className="index-item-beds"> {baths} baths</span>
              <br />
              <span className="index-item-adress"> {address}</span>
            </div>
          </div>
        </li>

      
    );
  }
}

export default withRouter(PropertyIndexItem);
