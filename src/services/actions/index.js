import {API_URL, PLACE_ORDER_URL} from '../apiVariables';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';

export const ADD_TO_BURGER = 'ADD_TO_BURGER';
export const REMOVE_FROM_BURGER = 'REMOVE_FROM_BURGER';
export const CLEAR_BURGER = 'CLEAR_BURGER';
export const REORDER_BURGER = 'REORDER_BURGER';

export const SHOW_INGREDIENT = 'SHOW_INGREDIENT';
export const HIDE_INGREDIENT = 'HIDE_INGREDIENT';

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';
export const ORDER_MODAL_CLOSE = 'ORDER_MODAL_CLOSE';

export const SWITCH_INGREDIENT_TAB = 'SWITCH_INGREDIENT_TAB';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: data.data
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAIL
                    });
                }
            }).catch((error) => {
            dispatch({
                type: GET_INGREDIENTS_FAIL
            });
        });
    }
}

export function createOrder(bun, notBun) {
    return function (dispatch) {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });
        fetch(PLACE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ingredients": [...notBun, bun]
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch({
                        type: CREATE_ORDER_SUCCESS,
                        order: data
                    });
                    dispatch({
                        type: CLEAR_BURGER,
                        order: data
                    });
                } else {
                    dispatch({
                        type: CREATE_ORDER_FAIL
                    });
                }
            }).catch((error) => {
            dispatch({
                type: CREATE_ORDER_FAIL
            });
        });
    }
}

export const closeModal = () => dispatch => {
    dispatch({
        type: ORDER_MODAL_CLOSE
    });
    dispatch({
        type: HIDE_INGREDIENT
    });
}