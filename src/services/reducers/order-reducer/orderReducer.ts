import {preloadedState} from "../../preloadedState";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_CLOSE
} from '../../actions/order';
import {TOrderActions, TOrderCreatedState} from "../../types/order";

const initialState: TOrderCreatedState = preloadedState.order;
export const orderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                orderRequest: true,
                orderRailed: false
            }
        case ORDER_CREATE_SUCCESS:
            return {
                data: action.order,
                orderRequest: false,
                orderRailed: false
            }
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                orderRequest: false,
                orderRailed: true
            }
        case ORDER_CLOSE:
            return preloadedState.order;
        default:
            return state;
    }
}