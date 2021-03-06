import { RECEIVE_OWNER } from '../actions/owner_actions';

const ownerReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_OWNER:
      return { ownerEmail: action.owner.email }
    default:
      return state;
  }
};

export default ownerReducer;