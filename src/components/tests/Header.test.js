import React from 'react';
import { shallow } from 'enzyme';

import Root from '../../Root';
import Header from '../Header.jsx';

it('renders without crashing', () => {
    const wrapped = shallow(
        <Root>
            <Header/>
        </Root>
    );
    expect(wrapped).toBeTruthy();
})