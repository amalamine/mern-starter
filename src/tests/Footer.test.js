import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../components/Footer.jsx';

it('renders without crashing', () => {
    const wrapped = shallow(<Footer/>);
    expect(wrapped).toBeTruthy();
})