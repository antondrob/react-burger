import {API_URL} from '../appVariables';
import {checkResponse} from "../helperFunctions";
import {Dispatch} from "react";
import {TGetIngredientsActions, TGetIngredientsResponse} from '../types/ingredients';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL: 'GET_INGREDIENTS_FAIL' = 'GET_INGREDIENTS_FAIL';

export const getIngredients = () => (dispatch: Dispatch<TGetIngredientsActions>) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    return fetch(API_URL)
        .then<TGetIngredientsResponse>(checkResponse)
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