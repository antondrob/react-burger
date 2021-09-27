import {combineReducers} from 'redux';
import {ingredientsReducer} from './ingredients-reducer/ingredientsReducer';
import {burgerReducer} from './burger-reducer/burgerReducer';
import {userReducer} from './user-reducer/userReducer';
import {orderReducer} from "./order-reducer/orderReducer";
import {websocketReducer} from "./websocket-reducer/websocketReducer";

// Корневой редьюсер
export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burger: burgerReducer,
    order: orderReducer,
    websocket: websocketReducer,
    user: userReducer
})