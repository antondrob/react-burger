import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredientsReducer';
import {burgerReducer} from './burgerReducer';
import {userReducer} from './userReducer';
import {orderReducer} from "./orderReducer";
import {websocketReducer} from "./websocketReducer";

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    order: orderReducer,
    websocket: websocketReducer,
    user: userReducer
})