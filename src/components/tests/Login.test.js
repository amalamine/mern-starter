import React from 'react';
import { shallow } from 'enzyme';

import Root from '../../Root';
import Login from '../Login.jsx';

it('renders without crashing', () => {
    const wrapped = shallow(
        <Root>
            <Login/>
        </Root>)
    ;
    expect(wrapped).toBeTruthy();
})