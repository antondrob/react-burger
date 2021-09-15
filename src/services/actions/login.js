import {LOGIN_URL} from "../appVariables";
import {checkResponse} from "../helperFunctions";

export const LOGIN_REQUEST = 'CREATE_ORDER_REQUEST';
export const LOGIN_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const LOGIN_FAIL = 'CREATE_ORDER_FAIL';

export const login = () => (dispatch) => {
    dispatch({
        type: LOGIN_REQUEST
    });
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
        .then(checkResponse)
        .then(data => {
            if (data.success) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    order: data
                });
            } else {
                dispatch({
                    type: LOGIN_FAIL
                });
            }
        }).catch((error) => {
            dispatch({
                type: LOGIN_FAIL
            });
        });
}