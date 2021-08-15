import {preloadedState} from "../preloadedState";
import {
    SHOW_INGREDIENT,
    HIDE_INGREDIENT
} from '../actions/ingredient';

export const ingredientReducer = (state = preloadedState.ingredient, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT:
            return action.item;
        case HIDE_INGREDIENT:
            return preloadedState.ingredient;
        default:
            return state;
    }
}