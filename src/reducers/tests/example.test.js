import exampleReducer from '../example';
import { EXAMPLE } from '../../actions/types';

it('handles actions of type EXAMPLE', () => {
    const action = {
        type: EXAMPLE,
        payload: 'Example'
    };

    const newState = exampleReducer([], action);
    console.log('New state: ', newState);
    expect(newState).toEqual([]);
});

it('handles actions with unknown type', () => {
    const newState = exampleReducer([], {type: '???'});
    expect(newState).toEqual([]);
});