import actionTypes from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.example:
      return action.payload.data;
  }
  return state;
}
