import {WS_ALL_ORDERS} from "../../appVariables";

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_FINISH: 'WS_CONNECTION_FINISH' = 'WS_CONNECTION_FINISH';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

type WsConnectionStart = {
    type: typeof WS_CONNECTION_START;
    payload: {
        url: string,
        secure: boolean
    };
};
type WsConnectionSuccess = {
    type: typeof WS_CONNECTION_SUCCESS;
    payload?: string;
};
type WsConnectionError = {
    type: typeof WS_CONNECTION_ERROR;
    payload: string;
};
type WsConnectionFinish = {
    type: typeof WS_CONNECTION_FINISH;
    payload?: string;
};
type WsConnectionClosed = {
    type: typeof WS_CONNECTION_CLOSED;
    payload?: string;
};
type WsGetOrders = {
    type: typeof WS_GET_ORDERS;
    payload: any; //TODO доделать WsGetOrders
};

export type WSActions =
    WsConnectionStart
    | WsConnectionSuccess
    | WsConnectionError
    | WsConnectionFinish
    | WsConnectionClosed
    | WsGetOrders;