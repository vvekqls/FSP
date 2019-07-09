
import merge from 'lodash/merge';
import { RECEIVE_PROPERTIES, RECEIVE_PROPERTY } from '../actions/property_actions'
const propertiesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROPERTIES:
      return action.properties;
    case RECEIVE_PROPERTY:
      return merge({}, state, { [action.property.id]: action.property });
    default:
      return state;
  }
};

export default propertiesReducer;
