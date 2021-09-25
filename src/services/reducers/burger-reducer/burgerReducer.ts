import {preloadedState} from "../../preloadedState";

import {
    ADD_TO_BURGER,
    REMOVE_FROM_BURGER,
    REORDER_BURGER,
    CLEAR_BURGER
} from '../../actions/burger';
import {TBurgerConstructorActions, TBurgerConstructorState } from "../../types/burger";

const initialState: TBurgerConstructorState = preloadedState.burger;
export const burgerReducer = (state = initialState, action: TBurgerConstructorActions) => {
    switch (action.type) {
        case ADD_TO_BURGER:
            if (action.item.type === 'bun') {
                return {
                    ...state,
                    bun: action.item
                };
            }
            return {
                ...state,
                notBun: [
                    ...state.notBun,
                    {
                        ...action.item,
                        uniqueId: action.uniqueId
                    }
                ]
            }
        case REMOVE_FROM_BURGER:
            return {
                ...state,
                notBun: [...state.notBun].filter((el) => el.uniqueId !== action.uniqueId)
            }
        case REORDER_BURGER:
            return {
                ...state,
                notBun: action.payload
            }
        case CLEAR_BURGER:
            return preloadedState.burger;
        default:
            return state;
    }
}