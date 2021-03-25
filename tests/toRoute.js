import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import * as Yup from 'yup';

import Trail from '../src/Trail';

const HomeTrail = new Trail('/');

const Home = () => <div>Home</div>;
const NotFound = () => <div>No match</div>;

afterEach(cleanup);

test('errors when neither component, render nor children properties are provided', () => {
    jest.spyOn(global.console, "error").mockImplementation(() => { })
    HomeTrail.toRoute({ invalid: NotFound });
    expect(console.error).toBeCalled();
})

test('errors when invalid property is not provided', () => {
    jest.spyOn(global.console, "error").mockImplementation(() => { })
    HomeTrail.toRoute({ component: Home });
    expect(console.error).toBeCalled();
})

test('warning when children node is provided', () => {
    jest.spyOn(global.console, "error").mockImplementation(() => { })
    HomeTrail.toRoute({ children: <Home />, invalid: NotFound });
    expect(console.error).toBeCalled();
})
