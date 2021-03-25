import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import * as Yup from 'yup';

import Trail from '../src/Trail';

afterEach(cleanup);

const isNullableDate = Yup.string().test('is-date', '${path}:${value} is not a valid date', date => !date || !isNaN(Date.parse(date)));
const integer = Yup.number().integer();
const naturalNbr = integer.moreThan(-1);
const wholeNbr = integer.positive();

test('constructs with no params', () => {
    const HomeTrail = new Trail('/');
    expect(HomeTrail).toBeDefined();
    expect(HomeTrail.path).toMatch('/');
})

test('constructs with path params', () => {
    const ResourceTrail = new Trail('/resources/:id', { id: wholeNbr.required() });
    expect(ResourceTrail).toBeDefined();
    expect(ResourceTrail.path).toMatch('/resources/:id');
})

test('constructs with query string params', () => {
    const ResourceListTrail = new Trail('/resources', null, {
        typeID: wholeNbr.required(),
        page: naturalNbr.default(0),
        rowsPerPage: Yup.number().oneOf([25, 50, 75, 100]).default(25),
        order: Yup.string().oneOf(['asc', 'desc']).default('asc'),
        isActive: Yup.boolean(),
        categoryID: wholeNbr.nullable(),
    });
    expect(ResourceListTrail).toBeDefined();
    expect(ResourceListTrail.path).toMatch('/resources');
})


