import {getCookie} from "../helperFunctions";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_FINISH,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_ORDERS
} from "../actions/websocket";

export const socketMiddleware = (store) => {
    let socket = null;
    return next => action => {
        const {dispatch} = store;
        const {type, payload} = action;

        if (type === WS_CONNECTION_START) {
            const token = getCookie('accessToken').replace('Bearer ', '');
            socket = new WebSocket(payload.secure ? `${payload.url}?token=${token}` : payload.url);
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
                    type: WS_GET_ORDERS, payload: parsedData
                });
            }
            socket.onclose = event => {
                dispatch({type: WS_CONNECTION_CLOSED, payload: event});
            }
            if (type === WS_CONNECTION_FINISH) {
                socket.close(payload);
            }
        }
        next(action);
    }
}