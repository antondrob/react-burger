import {WS_ALL_ORDERS} from "../../appVariables";
import {TWsOrder} from "../index";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_FINISH: 'WS_CONNECTION_FINISH' = 'WS_CONNECTION_FINISH';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export type TWebSocket = {
    orders: TWsOrder[] | null;
    total: number | null;
    totalToday: number | null;
    wsConnected: boolean;
    error: string | null;
};

type TWebSocketResponse = {
    success: boolean;
    orders: TWsOrder[];
    total: number;
    totalToday: number;
};

type WsConnectionStart = {
    type: typeof WS_CONNECTION_START;
    payload: {
        url: string,
        secure: boolean
    };
};
type WsConnectionSuccess = {
    type: typeof WS_CONNECTION_SUCCESS;
    payload: string;
};
type WsConnectionError = {
    type: typeof WS_CONNECTION_ERROR;
    payload: string;
};
type WsConnectionFinish = {
    type: typeof WS_CONNECTION_FINISH;
    payload: number;
};
type WsConnectionClosed = {
    type: typeof WS_CONNECTION_CLOSED;
};
type WsGetOrders = {
    type: typeof WS_GET_ORDERS;
    payload: TWebSocketResponse;
};

export type WSActions =
    WsConnectionStart
    | WsConnectionSuccess
    | WsConnectionError
    | WsConnectionFinish
    | WsConnectionClosed
    | WsGetOrders;