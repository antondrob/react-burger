import {TIngredient} from "../index";
import {GET_INGREDIENTS_FAIL, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../../actions/ingredients";

export type TBurgerIngredientsState = {
    items: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
};

export type TGetIngredientsResponse = {
    readonly success?: boolean;
    readonly data: TIngredient[];
} & Response;

type TGetIngredientsRequestAction = {
    type: typeof GET_INGREDIENTS_REQUEST;
};
type TGetIngredientsSuccessAction = {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: TIngredient[];
};
type TGetIngredientsFailAction = {
    type: typeof GET_INGREDIENTS_FAIL;
};
export type TGetIngredientsActions = TGetIngredientsRequestAction | TGetIngredientsSuccessAction | TGetIngredientsFailAction;