import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ExampleReducer from './example';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  example: ExampleReducer,
  form: formReducer, 
  auth: AuthReducer
});

export default rootReducer;
