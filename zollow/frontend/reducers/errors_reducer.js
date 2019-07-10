import { combineReducers } from 'redux';

import propertyErrorsReducer from './property_errors_reducer'
import session from './session_errors_reducers';

const errorsReducer = combineReducers({
  session: session,
  property: propertyErrorsReducer
});

export default errorsReducer;

