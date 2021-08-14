import {preloadedState} from "../preloadedState";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL
} from '../actions/order';
import {ORDER_MODAL_CLOSE} from '../actions/modal';

export const orderReducer = (state = preloadedState.order, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false
            }
        }
        case CREATE_ORDER_SUCCESS: {
            return {
                data: action.order,
                orderRequest: false,
                orderFailed: false
            }
        }
        case ORDER_MODAL_CLOSE: {
            return preloadedState.order;
        }
        case CREATE_ORDER_FAIL: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }
        default:
            return state;
    }
}