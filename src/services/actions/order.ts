import {ORDER_URL} from '../appVariables';
import {CLEAR_BURGER} from './burger';
import {checkResponse, deleteCookies, getCookie} from "../helperFunctions";
import {refreshToken} from "./user";
import {TIngredient} from "../types";
import {TOrderCreatedResponse, TOrderActions} from "../types/order";
import {Dispatch} from 'react';

export const ORDER_CREATE_REQUEST: 'ORDER_CREATE_REQUEST' = 'ORDER_CREATE_REQUEST';
export const ORDER_CREATE_SUCCESS: 'ORDER_CREATE_SUCCESS' = 'ORDER_CREATE_SUCCESS';
export const ORDER_CREATE_FAIL: 'ORDER_CREATE_FAIL' = 'ORDER_CREATE_FAIL';
export const ORDER_CLOSE: 'ORDER_CLOSE' = 'ORDER_CLOSE';

export const createOrder = (ingredients: TIngredient[]) => async (dispatch: Dispatch<TOrderActions | void>) => {
    dispatch({
        type: ORDER_CREATE_REQUEST
    });
    try {
        const res = await fetch(ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken')
            },
            body: JSON.stringify({ingredients})
        });
        const res_1: TOrderCreatedResponse = await checkResponse(res);
        if (res_1.success) {
            dispatch({
                type: CLEAR_BURGER
            });
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                order: res_1.order
            });
        } else {
            throw new Error(res_1.statusText);
        }
    } catch (error) {
        if (error.message === 'jwt expired' || error.message === 'invalid signature') {
            dispatch(refreshToken(createOrder(ingredients)));
        } else {
            dispatch({
                type: ORDER_CREATE_FAIL
            });
            deleteCookies(['accessToken', 'refreshToken']);
            alert(error.message);
        }
    }
}