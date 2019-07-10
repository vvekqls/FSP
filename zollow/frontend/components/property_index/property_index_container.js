import React from 'react';
import PropertyIndex from './property_index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchProperties } from '../../actions/property_actions';

const mapStateToProps = (state) => {
  return {
    properties: Object.values(state.entities.properties),
    // navLink: <Link to="/properties">Sell</Link>,
  };
};

const mapDispatchToProps = dispatch => {
  
  return {
    fetchProperties: () => dispatch(fetchProperties())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyIndex));