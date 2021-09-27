import * as actions from '../../actions/websocket';
import {preloadedState} from "../../preloadedState";
import {websocketReducer} from "./websocketReducer";
import {TWsOrder} from "../../types";

const TestWs = {
    success: true,
    orders: [
        {
            _id: '614fa423dab0f3001bb0915c',
            ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733c9',
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733c7'
            ],
            status: 'done',
            name: 'Бессмертный space флюоресцентный бургер',
            createdAt: '2021-09-25T22:35:15.763Z',
            updatedAt: '2021-09-25T22:35:15.917Z',
            number: 3920
        },
        {
            _id: '614fa172dab0f3001bb0915a',
            ingredients: [
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733c7'
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2021-09-25T22:23:46.734Z',
            updatedAt: '2021-09-25T22:23:46.837Z',
            number: 3919
        }
    ],
    total: 50,
    totalToday: 5
};

describe('WebSocket Reducer', () => {
    it('should return the initial state', () => {
        expect(websocketReducer(undefined, <any>{})).toEqual(preloadedState.websocket)
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
            type: actions.WS_CONNECTION_CLOSED
        });
        expect(received).toEqual(expected)
    })
    it('should handle WS_GET_ORDERS action', () => {
        const expected = {
            ...preloadedState.websocket,
            orders: TestWs.orders,
            total: TestWs.total,
            totalToday: TestWs.totalToday
        };
        const received = websocketReducer(preloadedState.websocket, {
            type: actions.WS_GET_ORDERS,
            payload: TestWs
        });
        expect(received).toEqual(expected)
    })
})