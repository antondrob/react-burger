import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredientsReducer';
import {burgerReducer} from './burgerReducer';
import {userReducer} from './userReducer';

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    user: userReducer
})