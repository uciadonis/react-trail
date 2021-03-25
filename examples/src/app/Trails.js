import * as Yup from 'yup';
import Trail from '../../../src/Trail';

const integer = Yup.number().integer();
const wholeNbr = integer.positive();

export const HomeTrail = new Trail('/');

export const ItemListTrail = new Trail('/items', null, {
    isActive: Yup.boolean(),
    categoryID: wholeNbr.nullable(),
});

export const ItemTrail = new Trail('/items/:id', { id: wholeNbr.required() });

export default {
    Home: HomeTrail,
    ItemList: ItemListTrail,
    Item: ItemTrail,
};