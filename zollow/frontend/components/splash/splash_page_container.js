import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import SplashPage from './splash_page';
import { changeFilter } from '../../actions/filter_actions';
import { openModal } from '../../actions/modal_actions';

const msp = state => {
  return {
    loggedIn: state.session.id
  };
};

const mdp = dispatch => {
  return {
    updateFilter: (filter, value) => dispatch(changeFilter(filter, value)),
    openModal: modal => dispatch(openModal(modal))
  };
};

export default withRouter(connect(msp, mdp)(SplashPage));