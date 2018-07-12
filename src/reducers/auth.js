import actionTypes from '../actions/types';

const initial_state = {
    authenticated: '',
    errorMessage: ''
}

export default function(state = initial_state, action) {
  switch (action.type) {
    case actionTypes.authenticate:
      return {...state, authenticated: action.payload.data}
    case actionTypes.authError:
      return {...state, errorMessage: action.payload.data}
    default:
      return state;
  }
}
