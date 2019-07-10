import React from 'react';
import { withRouter } from 'react-router-dom';

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
    const { address, price, rent, sale, beds, baths} = this.props.property
    return (
      <div
        className="property-index-item"
        onClick={this.handleClick}>
        <div className="index-item-info">
          <span className="index-item-category"> price:</span>
            <span> {price} </span>
          <span className="index-item-category"> address:</span>
          <span className="index-item-copy">
            {address}
          </span>
          <span className="index-item-category"> beds:</span>
            <span> {beds} </span>
          <span className="index-item-category"> baths:</span>
            <span> {baths} </span>
        </div>
        {/* <img src={picture_url} /> */}
      </div>
    );
  }
}

export default withRouter(PropertyIndexItem);
