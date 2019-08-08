import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PropertyIndexItem from './property_index_item';
import Footer from '../footer'
import Pagination from '../../util/pagination_util';

class PropertyListing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  render() {
    const { properties: allProperties } = this.props;
    let type = /[a-z]{3,}/.exec(this.props.location.pathname)[0];

    const PropertyStart = (this.state.page - 1) * 20;
    const PropertyEnd = this.state.page * 20;
    const properties = allProperties.slice(PropertyStart, PropertyEnd).map(property => {
      return (
        <PropertyIndexItem
          key={property.id}
          property={property}
          type={type}
          saved={this.props.savedProperties.includes(property.id)} 
          />
      );
    });

    if (type === 'sell') type = 'compete with';

    return (
      <div className='index-items-container'>
        <h2>Real Estate</h2> <span>{allProperties.length} properties to {type}</span>
        <ul className='index-items'>
          {properties}
        </ul>

        <ul className='number-pages'>
          {Pagination(this)}
        </ul>
        <Footer />
      </div>
    );
  }
}

const msp = state => {
  const user = state.entities.users[state.session.id] || {};

  return {
    properties: Object.values(state.entities.properties),
    savedProperties: user.savedProperties || []
  };
};

const mdp = dispatch => {
  return {};
};

export default withRouter(connect(msp, mdp)(PropertyListing));
