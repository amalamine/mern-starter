import actionTypes from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.exampleAction:
      return action.payload.data;
  }
  return state;
}
