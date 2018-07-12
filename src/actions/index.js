import axios from 'axios';
import actionTypes from './types';

export const example = input => async dispatch => {
  const response = await axios.get('/endpoints/example', { 
    params: input
  });
  dispatch({
    type: actionTypes.example,
    payload: response
  })
};

export const authenticate = (input, callback) => async dispatch => {
  try {
    const response = await axios.get('/endpoints/example', { params: input });
    dispatch({
      type: actionTypes.authenticate,
      payload: response
    });
    callback();
  }
  catch (e) {
    dispatch({ 
      type: actionTypes.authError, 
      payload: 'Unauthorised' 
    });
    callback();
  }
  
};
