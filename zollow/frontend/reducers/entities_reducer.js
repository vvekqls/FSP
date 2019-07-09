import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import propertiesReducer from './properties_reducer'

const entitiesReducer = combineReducers({
  users: usersReducer,
  properties: propertiesReducer
});

export default entitiesReducer;

