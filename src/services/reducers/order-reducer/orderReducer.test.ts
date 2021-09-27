import {orderReducer} from './orderReducer';
import {preloadedState} from '../../preloadedState';
import * as actions from '../../actions/order';

const orderTest = {
    ingredients: [
        {
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
            __v: 0
        },
        {
            _id: '60d3b41abdacab0026a733c9',
            name: 'Мясо бессмертных моллюсков Protostomia',
            type: 'main',
            proteins: 433,
            fat: 244,
            carbohydrates: 33,
            calories: 420,
            price: 1337,
            image: 'https://code.s3.yandex.net/react/code/meat-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
            __v: 0
        },
        {
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
            __v: 0
        },
        {
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
            __v: 0
        }
    ],
    _id: '614fa423dab0f3001bb0915c',
    owner: {
        name: 'Anton3',
        email: 'antondrob@bk.ru',
        createdAt: '2021-08-26T06:40:43.635Z',
        updatedAt: '2021-09-25T18:00:34.801Z'
    },
    status: 'done',
    name: 'Бессмертный space флюоресцентный бургер',
    createdAt: '2021-09-25T22:35:15.763Z',
    updatedAt: '2021-09-25T22:35:15.917Z',
    number: 3920,
    price: 3393
};

describe('Order Reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(preloadedState.order)
    })
    it('should handle ORDER_CREATE_REQUEST action', () => {
        const expected = {
            ...preloadedState.order,
            orderRequest: true
        };
        const received = orderReducer(preloadedState.order, {type: actions.ORDER_CREATE_REQUEST});
        expect(expected).toEqual(received);
    })
    it('should handle ORDER_CREATE_SUCCESS action', () => {
        const initialState = {
            ...preloadedState.order,
            orderRequest: true
        };
        const expected = {
            ...preloadedState.order,
            data: orderTest
        };
        const received = orderReducer(initialState, {
            type: actions.ORDER_CREATE_SUCCESS,
            order: orderTest
        });
        expect(expected).toEqual(received);
    })
    it('should handle ORDER_CREATE_FAIL action', () => {
        const initialState = {
            ...preloadedState.order,
            orderRequest: true
        };
        const expected = {
            ...preloadedState.order,
            orderRailed: true
        };
        const received = orderReducer(initialState, {
            type: actions.ORDER_CREATE_FAIL
        });
        expect(expected).toEqual(received);
    })
    it('should handle ORDER_CLOSE action', () => {
        const initialState = {
            ...preloadedState.order,
            data: orderTest
        };
        const expected = preloadedState.order;
        const received = orderReducer(initialState, {
            type: actions.ORDER_CLOSE
        });
        expect(expected).toEqual(received);
    })
});