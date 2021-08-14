import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAIL,
    ADD_TO_BURGER,
    REMOVE_FROM_BURGER,
    CLEAR_BURGER,
    SHOW_INGREDIENT,
    HIDE_INGREDIENT,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    ORDER_MODAL_CLOSE,
    SWITCH_INGREDIENT_TAB,
    REORDER_BURGER
} from '../actions';
import {uuid} from '../uuid';
import {preloadedState} from '../preloadedState';
// Редьюсер списка ингредиентов
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
// Редьюсер конструктора бургера
export const burgerReducer = (state = preloadedState.burger, action) => {
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
                        uniqueId: action.item._id + uuid()
                    }
                ]
            };
        case REMOVE_FROM_BURGER:
            return {
                ...state,
                notBun: [...state.notBun].filter((el) => el.uniqueId !== action.uniqueId)
            }
        case REORDER_BURGER:
            return {
                ...state,
                notBun: action.payload
            };
        case CLEAR_BURGER:
            return preloadedState.burger;
        default:
            return state;
    }
}
// Редьюсер просматриваемого ингредиента
export const ingredientReducer = (state = preloadedState.ingredient, action) => {
    switch (action.type) {
        case SHOW_INGREDIENT:
            return action.item;
        case HIDE_INGREDIENT:
            return {};
        default:
            return state;
    }
}
// Редьюсер заказа
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
            return {
                data: {},
                orderRequest: false,
                orderFailed: false
            }
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
// Редьюсер переключения табов
export const ingredientTabsReducer = (state = preloadedState.tabs, action) => {
    switch (action.type) {
        case SWITCH_INGREDIENT_TAB: {
            return [...state].map(el => {
                if (el.id === action.id) {
                    return {
                        ...el,
                        active: true
                    }
                } else {
                    return {
                        ...el,
                        active: false
                    }
                }
            });
        }
        default:
            return state;
    }
}