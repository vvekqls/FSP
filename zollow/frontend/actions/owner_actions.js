import ownerUtil from '../util/owner_api_util';

export const RECEIVE_OWNER = "RECEIVE_OWENR";

const receiveOwner = owner => ({
  type: RECEIVE_OWNER,
  owner
})

export const fetchOwner = ownerId => dispatch => (
  ownerUtil(ownerId).then(owner => {
    return dispatch(receiveOwner(owner))
  })
);