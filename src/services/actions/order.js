import {PLACE_ORDER_URL} from "../apiVariables";
import {CLEAR_BURGER} from "./burgerConstructor";

export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

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