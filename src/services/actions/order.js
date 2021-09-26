import {ORDER_URL} from '../appVariables';
import {CLEAR_BURGER} from './burger';
import {checkResponse, deleteCookies, getCookie} from "../helperFunctions";
import {refreshToken} from "./user";

export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST';
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS';
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL';
export const ORDER_CLOSE = 'ORDER_CLOSE';

export const createOrder = (ingredients) => dispatch => {
    dispatch({
        type: ORDER_CREATE_REQUEST
    });
    return fetch(ORDER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('accessToken')
        },
        body: JSON.stringify({ingredients})
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                dispatch({
                    type: CLEAR_BURGER
                });
                dispatch({
                    type: ORDER_CREATE_SUCCESS,
                    order: res.order
                });
            } else {
                throw new Error(res.message);
            }
        }).catch(error => {
            if (error.message === 'jwt expired' || error.message === 'invalid signature') {
                dispatch(refreshToken(createOrder()));
            } else {
                dispatch({
                    type: ORDER_CREATE_FAIL
                });
                deleteCookies(['accessToken', 'refreshToken']);
                alert(error.message);
            }
        });
}