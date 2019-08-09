import { connect } from 'react-redux';
import Property from './property_show';

import { fetchOwner } from '../../actions/owner_actions';
import { fetchProperty, deleteProperty, fetchProperties } from '../../actions/property_actions';
import { createSave, deleteSave } from '../../actions/save_actions';
import { openModal } from '../../actions/modal_actions';

const msp = (state, ownProps) => {
  const propertyId = parseInt(ownProps.match.params.propertyId);
  const property = state.entities.properties[propertyId] || {};
  const user = state.entities.users[state.session.id];
  
  return {
    sessionId: state.session.id,
    loggedIn: Boolean(state.session.id),
    saved: user ? user.savedProperties.includes(propertyId) : false,
    
    amtPhotos: property.photos ? property.photos.length : 1,

    property: {
      id: property.id || null,
      address: property.address || '',
      baths: property.baths || 0,
      beds: property.beds || 0,
      ownerId: property.owner_id || null,
      ownerEmail: state.entities.owner.ownerEmail || '',
      sale: property.sale || null,
      rent: property.rent || null,
      price: property.price || 0,
      photos: property.photos || []
    }
  };
};

const mdp = dispatch => {
  return {
    fetchOwner: (ownerId) => dispatch(fetchOwner(ownerId)),
    fetchProperty: (propertyId) => dispatch(fetchProperty(propertyId)),
    createSave: (propertyId) => dispatch(createSave(propertyId)),
    deleteSave: (propertyId) => dispatch(deleteSave(propertyId)),
    deleteProperty: id => dispatch(deleteProperty(id)),
    openModal: modal => dispatch(openModal(modal)),
    fetchProperties: () => dispatch(fetchProperties())
    };
};

export default connect(msp, mdp)(Property);

