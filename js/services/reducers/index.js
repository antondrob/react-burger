import { combineReducers } from 'redux';
import { ingredientsReducer, burgerReducer, ingredientReducer, orderReducer } from './allReducers';
// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    ingredient: ingredientReducer,
    order: orderReducer
});
