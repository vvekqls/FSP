import { connect } from 'react-redux';
import ManageHome from './property_form';

import { updateProperty } from '../../actions/property_actions';
import { changeFilter } from '../../actions/filter_actions';

const msp = (reactState, ownProps) => {
  if (!reactState.session.id) return {};

  const property = reactState.entities.properties[ownProps.match.params.propertyId] || { address: '' };
  const [streetAddress, city, state, zip] = property.address.split(', ');

  return {
    prevLoc: reactState.ui.filters.buy ? 'buy' : 'rent',

    property: {
      streetAddress,
      id: ownProps.match.params.propertyId,
      city,
      state,
      zip,
      baths: property.baths,
      beds: property.beds,
      userId: reactState.session.id,
      ownerEmail: reactState.entities.users[reactState.session.id].email,
      sale: property.sale,
      rent: property.rent,
      price: property.price,
      photosUrl: property.photos
    },

    errors: reactState.errors.property
  };
};

const mdp = dispatch => {
  return {
    processHome: (property, id) => dispatch(updateProperty(property, id)),
    changeFilter: (filter, value) => dispatch(changeFilter(filter, value))
  };
};

export default connect(msp, mdp)(ManageHome);