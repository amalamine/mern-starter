import React from 'react';
import { shallow } from 'enzyme';

import Login from '../components/Login.jsx';

it('renders without crashing', () => {
    const wrapped = shallow(<Login/>);
    expect(wrapped).toBeTruthy();
})