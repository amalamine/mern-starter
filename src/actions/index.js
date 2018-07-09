import axios from 'axios';
import actionTypes from './types';

// export function example(email, password) {
//   let request = axios.get('/endpoints/example')
//   return {
//     type: actionTypes.example,
//     payload: request
//   }
// }

export const example = (input) => (dispatch) => {
  axios.get('/endpoints/example', { 
    params: input
  });
  // dispatch({
  //   type: actionTypes.example,
  //   payload: request
  // });
  // request.then(() => {
  //   dispatch({
  //     type: actionTypes.example,
  //     payload: request
  //   })
  // })
};
