import { RECEIVE_OWNER } from '../actions/owner_action';

const ownerReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_OWNER:
      return { ownerUsername: action.owner.username }
    default:
      return state;
  }
};

export default ownerReducer;