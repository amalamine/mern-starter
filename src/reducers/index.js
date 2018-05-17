import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ExampleReducer from './example';

const rootReducer = combineReducers({
  example: ExampleReducer,
  form: formReducer
});

export default rootReducer;
