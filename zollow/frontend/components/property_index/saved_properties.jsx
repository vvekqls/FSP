import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PropertyIndexItem from './property_index_item';
import Footer from '../footer';
import Pagination from '../../util/pagination_util';
import { savedProperties } from '../../actions/property_actions';

class SavedProperties extends React.Component {
  constructor(props) {
    super(props);

    this.state = { page: 1, type: this.props.type };
  }

  componentDidMount() {
    this.props.fetchProperties(this.props.savedProperties);
  }

  componentDidUpdate(prevProps) {
    if (this.props.properties.length != this.props.savedProperties.length) {
      this.props.fetchProperties(this.props.savedProperties);
    }
  }

  render() {
    const { properties: allProperties } = this.props;
    const type = /[a-z]{3,}/.exec(this.props.location.pathname)[0];

    const houseStart = (this.state.page - 1) * 20;
    const houseEnd = this.state.page * 20;
    const properties = allProperties.slice(houseStart, houseEnd).map(property => {
      return (
        <PropertyIndexItem
          key={property.id}
          property={property}
          type={type}
          saved={this.props.savedProperties.includes(property.id)} />
      );
    });

    return (
      <div className='index-items-container'>
        <h2>Real Estate</h2> <span>{allProperties.length} Saved Properties</span>
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
  return {
    fetchProperties: (propertyIds) => dispatch(savedProperties(propertyIds))
  };
};

export default withRouter(connect(msp, mdp)(SavedProperties));