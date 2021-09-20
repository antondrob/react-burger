import * as actions from '../actions/websocket';
import {preloadedState} from "../preloadedState";
import {websocketReducer} from "./websocketReducer";

describe('WebSocket Reducer', () => {
    it('should return the initial state', () => {
        expect(websocketReducer(undefined, {})).toEqual(preloadedState.websocket)
    })
    it('should handle WS_CONNECTION_SUCCESS action', () => {
        const expected = {
            ...preloadedState.websocket,
            error: null,
            wsConnected: true
        };
        const received = websocketReducer(preloadedState.websocket, {
            type: actions.WS_CONNECTION_SUCCESS,
            payload: 'websocket event'
        });
        expect(received).toEqual(expected)
    })
    it('should handle WS_CONNECTION_ERROR action', () => {
        const expected = {
            ...preloadedState.websocket,
            error: 'WebSocket error'
        };
        const received = websocketReducer(preloadedState.websocket, {
            type: actions.WS_CONNECTION_ERROR,
            payload: 'WebSocket error'
        });
        expect(received).toEqual(expected)
    })
    it('should handle WS_CONNECTION_CLOSED action', () => {
        const initialState = {
            ...preloadedState.websocket,
            error: null,
            orders: [],
            total: 5,
            totalToday: 55,
        };
        const expected = preloadedState.websocket;
        const received = websocketReducer(initialState, {
            type: actions.WS_CONNECTION_CLOSED,
            payload: 'WebSocket event'
        });
        expect(received).toEqual(expected)
    })
    it('should handle WS_GET_ORDERS action', () => {
        const expected = {
            ...preloadedState.websocket,
            orders: [],
            total: 5,
            totalToday: 55,
        };
        const received = websocketReducer(preloadedState.websocket, {
            type: actions.WS_GET_ORDERS,
            payload: {
                orders: [],
                total: 5,
                totalToday: 55,
            }
        });
        expect(received).toEqual(expected)
    })
})