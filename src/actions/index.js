import axios from 'axios';
import actionTypes from './types';

export function login(email, password) {
  let request = axios.get('/endpoints/example')
  return {
    type: actionTypes.example,
    payload: request
  }
}
