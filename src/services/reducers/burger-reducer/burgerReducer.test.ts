import * as actions from '../../actions/burger';
import {burgerReducer} from "./burgerReducer";
import {preloadedState} from '../../preloadedState';
import {orderReducer} from "../order-reducer/orderReducer";
import {v4 as uuidv4} from "uuid";

const testBun = {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    uniqueId: 'some-random-id',
    qty: 1,
    __v: 0
};
const testBun2 = {
    _id: '60d3b41abdacab0026a733cb',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    uniqueId: 'some-random-id2',
    qty: 2,
};
const testNotBun = {
    _id: '60d3b41abdacab0026a733cd',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    __v: 0,
    qty: 2,
    uniqueId: 'some-random-id'
};

describe('Burger Constructor Reducer', () => {
    it('should return the initial state', () => {
        expect(burgerReducer(undefined, {})).toEqual(preloadedState.burger)
    })
    it('should handle ADD_TO_BURGER action for buns', () => {
        const expected = {
            ...preloadedState.burger,
            bun: testBun
        };
        const received = burgerReducer(preloadedState.burger, {
            type: actions.ADD_TO_BURGER,
            item: testBun,
            uniqueId: 'some-random-id'
        });
        expect(received).toEqual(expected);
    })
    it('should handle ADD_TO_BURGER action for not buns', () => {
        const expected = {
            ...preloadedState.burger,
            notBun: [testNotBun]
        };
        const received = burgerReducer(preloadedState.burger, {
            type: actions.ADD_TO_BURGER,
            item: testNotBun,
            uniqueId: 'some-random-id'
        });
        expect(received).toEqual(expected);
    })
    it('should handle REMOVE_FROM_BURGER action', () => {
        const inititalState = {
            ...preloadedState.burger,
            notBun: [{
                type: 'notBun',
                uniqueId: 'some-random-id'
            }]
        };
        const expected = {
            ...preloadedState.burger,
            notBun: []
        };
        const received = burgerReducer(preloadedState.burger, {
            type: actions.REMOVE_FROM_BURGER,
            uniqueId: 'some-random-id'
        });
        expect(received).toEqual(expected);
    })

    it('should handle REORDER_BURGER action', () => {
        const inititalState = {
            ...preloadedState.burger,
            notBun: [
                testBun2,
                testBun
            ]
        };
        const expected = {
            ...preloadedState.burger,
            notBun: [
                testBun,
                testBun2
            ]
        };
        const received = burgerReducer(preloadedState.burger, {
            type: actions.REORDER_BURGER,
            payload: [
                testBun,
                testBun2
            ]
        });
        expect(received).toEqual(expected);
    })
    it('should handle CLEAR_BURGER action', () => {
        const initialState = {
            bun: testBun,
            notBun: [
                testBun2,
                testBun
            ]
        }
        const expected = preloadedState.burger;
        const received = burgerReducer(initialState, {
            type: actions.CLEAR_BURGER
        })
        expect(received).toEqual(expected);
    })
})