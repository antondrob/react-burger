import {preloadedState} from "../preloadedState";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAIL
} from '../actions/ingredients';

export const ingredientsReducer = (state = preloadedState.ingredients, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ingredientsFailed: false,
                items: action.ingredients,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAIL: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            };
        }
        default:
            return state;
    }
}