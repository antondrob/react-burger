import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CLOSE} from "../../actions/order";
import {TClearBurgerAction} from "../burger";
import {TIngredient, TOwner} from "../index";
import {refreshToken} from "../../actions/user";

type TOrder = {
    createdAt: string;
    ingredients: TIngredient[];
    name: string;
    number: number;
    owner?: TOwner;
    price?: number;
    status: string;
    updatedAt: string;
    _id: string;
};
export type TOrderCreatedState = {
    data: (TOrder | null),
    orderRequest: boolean,
    orderRailed: boolean
};
export type TOrderCreatedResponse = {
    name?: string;
    order: TOrder
    success?: boolean;
} & Response;

type TOrderCreateRequestAction = {
    type: typeof ORDER_CREATE_REQUEST;
};
type TOrderCreateSuccessAction = {
    type: typeof ORDER_CREATE_SUCCESS;
    order: TOrder;
};
type TOrderCreateFailAction = {
    type: typeof ORDER_CREATE_FAIL;
};
type TOrderCloseAction = {
    type: typeof ORDER_CLOSE;
};

export type TOrderActions =
    TOrderCreateRequestAction
    | TOrderCreateSuccessAction
    | TOrderCreateFailAction
    | TOrderCloseAction
    | TClearBurgerAction;