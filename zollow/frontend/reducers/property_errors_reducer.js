import { RECEIVE_PROPERTY_ERRORS, RECEIVE_PROPERTY } from '../actions/property_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PROPERTY_ERRORS:
      return action.errors;
    case RECEIVE_PROPERTY:
      return [];
    default:
      return state;
  }
};
