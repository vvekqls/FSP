import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import propertiesReducer from './properties_reducer'
import ownerReducer from './owner_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  properties: propertiesReducer,
  owner: ownerReducer
});

export default entitiesReducer;

