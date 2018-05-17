import { combineReducers } from 'redux';

import ExampleReducer from './example';

const rootReducer = combineReducers({
  example: ExampleReducer
});

export default rootReducer;
