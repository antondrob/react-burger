import {TIngredient} from "../index";
import {ADD_TO_BURGER, CLEAR_BURGER, REMOVE_FROM_BURGER, REORDER_BURGER} from "../../actions/burger";

export type TBurgerConstructorState = {
    bun: (TIngredient | null);
    notBun: TIngredient[];
};

type TAddToBurgerAction = {
    type: typeof ADD_TO_BURGER;
    item: TIngredient;
    uniqueId: string;
};
type TRemoveFromBurgerAction = {
    type: typeof REMOVE_FROM_BURGER;
    uniqueId: string;
};
type TReorderBurgerAction = {
    type: typeof REORDER_BURGER;
    payload: TIngredient[];
};
export type TClearBurgerAction = {
    type?: typeof CLEAR_BURGER;
};
export type TBurgerConstructorActions =
    TAddToBurgerAction
    | TRemoveFromBurgerAction
    | TReorderBurgerAction
    | TClearBurgerAction;