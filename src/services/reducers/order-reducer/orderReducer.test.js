import {orderReducer} from './orderReducer';
import {preloadedState} from '../../preloadedState';
import * as actions from '../../actions/order';

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
            data: "order body"
        };
        const received = orderReducer(initialState, {
            type: actions.ORDER_CREATE_SUCCESS,
            order: "order body"
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
            data: 'order body'
        };
        const expected = preloadedState.order;
        const received = orderReducer(initialState, {
            type: actions.ORDER_CLOSE
        });
        expect(expected).toEqual(received);
    })
});