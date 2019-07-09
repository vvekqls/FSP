import React from 'react';
import { withRouter } from 'react-router-dom';

import PropertyShowContainer from '../property_show/property_show_container';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const propertyId = this.props.property.id;
    this.props.history.push(`/properties/${propertyId}`);
  }

  render() {
    const { average_rating, description, picture_url } = this.props.bench;
    return (
      <div
        className="bench-index-item"
        onClick={this.handleClick}
      >
        <div className="index-item-info">
          <span className="index-item-category">Rating:</span>
          <span className="index-item-copy">
            {average_rating || 'No reviews yet'}
          </span>
          <span className="index-item-category">Description:</span>
          <span className="index-item-copy">{description}</span>
        </div>
        <img src={picture_url} />
      </div>
    );
  }
}

export default withRouter(IndexItem);
