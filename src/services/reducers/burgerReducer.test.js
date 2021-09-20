import * as actions from '../actions/burger';
import {burgerReducer} from "./burgerReducer";
import {preloadedState} from '../preloadedState';
import {orderReducer} from "./orderReducer";
import {v4 as uuidv4} from "uuid";

describe('Burger Constructor Reducer', () => {
    it('should return the initial state', () => {
        expect(burgerReducer(undefined, {})).toEqual(preloadedState.burger)
    })
    it('should handle ADD_TO_BURGER action for buns', () => {
        const expected = {
            ...preloadedState.burger,
            bun: {
                type: 'bun'
            }
        };
        const received = burgerReducer(preloadedState.burger, {
            type: actions.ADD_TO_BURGER,
            item: {
                type: 'bun'
            },
            uniqueId: 'some-random-id'
        });
        expect(received).toEqual(expected);
    })
    it('should handle ADD_TO_BURGER action for not buns', () => {
        const expected = {
            ...preloadedState.burger,
            notBun: [{
                type: 'notBun',
                uniqueId: 'some-random-id'
            }]
        };
        const received = burgerReducer(preloadedState.burger, {
            type: actions.ADD_TO_BURGER,
            item: {
                type: 'notBun'
            },
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
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id'
                },
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id2'
                }
            ]
        };
        const expected = {
            ...preloadedState.burger,
            notBun: [
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id2'
                },
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id'
                }
            ]
        };
        const received = burgerReducer(preloadedState.burger, {
            type: actions.REORDER_BURGER,
            payload: [
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id2'
                },
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id'
                }
            ]
        });
        expect(received).toEqual(expected);
    })
    it('should handle CLEAR_BURGER action', () => {
        const initialState = {
            bun: {
                type: 'bun'
            },
            notBun: [
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id2'
                },
                {
                    type: 'notBun',
                    uniqueId: 'some-random-id'
                }
            ]
        }
        const expected = preloadedState.burger;
        const received = burgerReducer(initialState, {
            type: actions.CLEAR_BURGER
        })
        expect(received).toEqual(expected);
    })
})