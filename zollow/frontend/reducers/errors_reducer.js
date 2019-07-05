import { combineReducers } from 'redux';

import session from './session_errors_reducers';

const errorsReducer = combineReducers({
  session: session
});

export default errorsReducer;

