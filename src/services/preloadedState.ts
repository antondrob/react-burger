import {TBurgerConstructorState} from "./types/burger";
import {TOrderCreatedState} from "./types/order";
import {TUserState} from "./types/user";
import {TBurgerIngredientsState} from "./types/ingredients";

type TPreloadedState = {
    ingredients: TBurgerIngredientsState;
    burger: TBurgerConstructorState;
    order: TOrderCreatedState;
    websocket: any;
    user: TUserState;
};
export const preloadedState: TPreloadedState = {
    ingredients: {
        items: [],
        ingredientsRequest: false,
        ingredientsFailed: false
    },
    burger: {
        bun: null,
        notBun: []
    },
    order: {
        data: null,
        orderRequest: false,
        orderRailed: false
    },
    websocket: {
        orders: null,
        total: null,
        totalToday: null,
        wsConnected: false,
        error: null
    },
    user: {
        data: null,
        login: {
            request: false,
            failed: false
        },
        logout: {
            request: false,
            failed: false
        },
        register: {
            request: false,
            failed: false
        },
        forgotPassword: {
            request: false,
            success: false
        },
        resetPassword: {
            request: false,
            success: false
        },
        getUserRequest: {
            request: false,
            failed: false
        },
        updateUserRequest: {
            request: false,
            success: false
        }
    }
};