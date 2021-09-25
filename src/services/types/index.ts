import {GET_INGREDIENTS_FAIL, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions/ingredients";

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    qty: number;
    type: string;
    _id: string;
    uniqueId?: string;
};
type TOwner = {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
};
export type TOrder = {
    createdAt: string;
    ingredients: TIngredient[];
    name: string;
    number: number;
    owner: TOwner;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;

};

export type TRefreshToken = <AfterRefresh>(fc: AfterRefresh) => void;