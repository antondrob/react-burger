import {HIDE_INGREDIENT} from "./ingredient";

export const ORDER_MODAL_CLOSE = 'ORDER_MODAL_CLOSE';
export const closeModal = () => dispatch => {
    dispatch({
        type: ORDER_MODAL_CLOSE
    });
    dispatch({
        type: HIDE_INGREDIENT
    });
}
