import React from 'react';
import { shallow } from 'enzyme';

import Root from '../../Root';
import Footer from '../Footer.jsx';

it('renders without crashing', () => {
    const wrapped = shallow(
        <Root>
            <Footer/>
        </Root>
    );
    expect(wrapped).toBeTruthy();
})