import {preloadedState} from '../../preloadedState';
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS
} from '../../actions/websocket';
import {WSActions} from "../../types/ws";

export const websocketReducer = (state = preloadedState.websocket, action: WSActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: null,
                wsConnected: true
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload ?? 'WebSocket error',
                wsConnected: false
            }
        case WS_CONNECTION_CLOSED:
            return preloadedState.websocket;
        case WS_GET_ORDERS:
            return {
                ...state,
                error: null,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            }
        default:
            return state;
    }
}