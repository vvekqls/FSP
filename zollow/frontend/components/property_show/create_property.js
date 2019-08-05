import { connect } from 'react-redux';
import PropertyForm from './property_form';

import { createProperty } from '../../actions/property_actions';
import { changeFilter } from '../../actions/filter_actions';

const msp = (reactState, ownProps) => {
  if (!reactState.session.id) return {};

  const formattedAddress = reactState.ui.filters.area.split(', ');

  let streetAddress = '', city = '', state = '', zip = '';

  if (formattedAddress.length > 3) {
    streetAddress = formattedAddress[0];
    city = formattedAddress[1];
    state = formattedAddress[2].split(" ")[0];
    zip = formattedAddress[2].split(" ")[1];
  }

  return {
    prevLoc: reactState.ui.filters.buy ? 'buy' : 'rent',

    property: {
      streetAddress,
      id: null,
      city,
      state,
      zip,
      baths: 0,
      beds: 0,
      userId: state.session.id,
      username: state.entities.users[state.session.id].email,
      sale: null,
      rent: null,
      price: 0,
      photos: []
    },

    errors: reactState.errors.property || []
  };
};

const mdp = dispatch => {
  return {
    processProperty: (property) => dispatch(createProperty(property)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value)),
  };
};

export default connect(msp, mdp)(PropertyForm);


