import React from 'react';
import { shallow } from 'enzyme';

import Header from '../components/Header.jsx';

it('renders without crashing', () => {
    const wrapped = shallow(<Header/>);
    expect(wrapped).toBeTruthy();
})