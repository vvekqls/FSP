import * as SaveAPIUtil from '../util/save_api_util';

export const RECEIVE_SAVE = 'RECEIVE_SAVE';
export const DESTROY_SAVE = 'DESTROY_SAVE';

export const receiveSave = currentUser => ({
  type: RECEIVE_SAVE,
  currentUser
});

export const destroySave = currentUser => ({
  type: DESTROY_SAVE,
  currentUser
});

export const createSave = id => dispatch => (
  SaveAPIUtil.createSave(id).then((currentUser) => (
    dispatch(receiveSave(currentUser))
  ))
);

export const deleteSave = id => dispatch => (
  SaveAPIUtil.deleteSave(id).then((currentUser) => (
    dispatch(destroySave(currentUser))
  ))
);