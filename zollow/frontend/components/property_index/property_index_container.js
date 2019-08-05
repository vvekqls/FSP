import React from 'react';
import PropertyIndex from './property_index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchProperties } from '../../actions/property_actions';
import { changeFilter } from '../../actions/filter_actions';

const mapStateToProps = (state, ownProps) => {
  // debugger
  return {
    properties: Object.values(state.entities.properties),
    type: /[a-z]{3,}/.exec(ownProps.location.pathname)[0],
    filters: state.ui.filters
  };
};

const mapDispatchToProps = dispatch => {
  
  return {
    fetchProperties: (filter) => dispatch(fetchProperties(filter)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyIndex));