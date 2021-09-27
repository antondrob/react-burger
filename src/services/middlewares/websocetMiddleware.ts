import {getCookie} from "../helperFunctions";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_FINISH,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "../actions/websocket";
import {WSActions} from "../types/ws";
import {Middleware} from "redux";
import {TRootStore} from "../store";

export const socketMiddleware: Middleware<{}, TRootStore> = (store) => {
    let socket: WebSocket | null = null;
    return next => (action: WSActions) => {
        const {dispatch} = store;

        if (action.type === WS_CONNECTION_START) {
            const token = getCookie('accessToken').replace('Bearer ', '');
            socket = new WebSocket(action.payload.secure ? `${action.payload.url}?token=${token}` : action.payload.url);
        }
        if (socket) {
            socket.onopen = event => {
                dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
            }
            socket.onerror = event => {
                dispatch({type: WS_CONNECTION_ERROR, payload: event});
            }
            socket.onmessage = event => {
                const {data} = event;
                const parsedData = JSON.parse(data);
                dispatch({
                    type: WS_GET_ORDERS,
                    payload: parsedData
                });
            }
            socket.onclose = event => {
                dispatch({type: WS_CONNECTION_CLOSED, payload: event});
            }
            if (action.type === WS_CONNECTION_FINISH) {
                socket.close(action.payload);
            }
        }
        next(action);
    }
}