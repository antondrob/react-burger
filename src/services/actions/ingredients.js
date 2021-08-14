import {API_URL} from '../apiVariables';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAIL = 'GET_INGREDIENTS_FAIL';

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