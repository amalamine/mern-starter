import React from 'react';
import { mount } from 'enzyme';

import Root from '../../Root';
import Home from '../Home.jsx';

let wrapped;

beforeEach(() => {
    wrapped = mount(
        <Root>
            <Home/>
        </Root>
    );
})

afterEach(() => {
    wrapped.unmount();
})

it('renders without crashing', () => {
    expect(wrapped).toBeTruthy();
})