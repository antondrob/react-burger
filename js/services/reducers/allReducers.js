import { GET_INGREDIENTS, ADD_TO_BURGER, REMOVE_FROM_BURGER, SHOW_INGREDIENT, HIDE_INGREDIENT, CREATE_ORDER } from '../actions';
// Редьюсер списка ингредиентов
export const ingredientsReducer = (state = [], action) => {
    switch (action.type) {
        case GET_INGREDIENTS:
            return state;
        default:
            return state;
    }
};
// Редьюсер конструктора бургера
export const burgerReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_BURGER:
            return state;
        case REMOVE_FROM_BURGER:
            return state;
        default:
            return state;
    }
};
// Редьюсер просматриваемого ингредиента
export const ingredientReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT:
            return state;
        case HIDE_INGREDIENT:
            return state;
        default:
            return state;
    }
};
// Редьюсер заказа
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return state;
        default:
            return state;
    }
};
