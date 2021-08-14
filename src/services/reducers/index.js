import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredientsReducer';
import {burgerReducer} from './burgerReducer';
import {ingredientReducer} from './ingredientReducer';
import {orderReducer} from './orderReducer';

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    ingredient: ingredientReducer,
    order: orderReducer
})