import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { openModal, closeModal } from '../../actions/modal_actions';
import { updateFilter } from '../../actions/filter_actions';
import IndexNav from './index_nav';

const msp = state => {
  const user = state.entities.users[state.session.id] || {};

  return {
    filters: state.ui.filters,
    savedProperties: user.savedProperties || [],
    loggedIn: Boolean(state.session.id)
  };
};

const mdp = dispatch => {
  return {
    openFilter: (type) => dispatch(openModal(type)),
    updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
    openModal: (type) => dispatch(openModal(type))
  };
};

export default withRouter(connect(msp, mdp)(IndexNav));
