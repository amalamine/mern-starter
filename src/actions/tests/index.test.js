import { example } from '../index';
import { EXAMPLE } from '../types';
import moxios from 'moxios';

describe('example', () => {
    beforeEach(() => {
        console.log('Installing moxios')
        moxios.install();
        moxios.stubRequest('/endpoints/example', {
            status: 200,
            response: {
                message: 'success'
            }
        });
    })  

    afterEach(() => {
        moxios.uninstall();
    })

    it('has the correct type', () => {
        const action = example();
        expect(action.type).toEqual('EXAMPLE');
    });

    it('has the correct payload', () => {
        const action = example('email@example.com', 'password');
        moxios.wait(() => {
            expect(action.payload).toEqual({message: 'success'});
        });
    });
})