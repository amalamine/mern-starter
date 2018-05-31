import React from 'react';
import { shallow } from 'enzyme';

import Home from '../components/Home.jsx';

it('renders without crashing', () => {
    const wrapped = shallow(<Home/>);
    expect(wrapped).toBeTruthy();
})