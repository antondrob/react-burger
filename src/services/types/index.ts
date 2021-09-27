import {TBurgerIngredientsState} from "./ingredients";
import {TBurgerConstructorState} from "./burger";
import {TOrderCreatedState} from "./order";
import {TWebSocket} from "./ws";
import {TUserState} from "./user";

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
    qty?: number;
    type: string;
    _id: string;
    uniqueId?: string;
};
export type TOwner = {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
};
export type TWsOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner?: TOwner;
    price?: number;
    status: string;
    updatedAt: string;
    _id: string;
};
export type TOrderCreate = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner?: TOwner;
    price?: number;
    status: string;
    updatedAt: string;
    _id: string;
};

export type TPreloadedState = {
    ingredients: TBurgerIngredientsState;
    burger: TBurgerConstructorState;
    order: TOrderCreatedState;
    websocket: TWebSocket;
    user: TUserState;
};

export type TRefreshToken = <AfterRefresh>(fc: AfterRefresh) => void;

export type TBurgerIngredientProps = {
    item: TIngredient;
};
export type TIngredientDetailsProps = {
    details?: TIngredient;
};
export type TNutritionalValue = {
    [key: string]: string;
};
export type TLoadingProps = {
    request: boolean;
    fail: boolean;
};
export type TModalProps = {
    children: React.ReactNode;
    header?: string;
};
export type TProtectedRouteProps = {
    children: React.ReactNode;
    path: string;
    exact?: boolean;
};
export type TModalOverlayProps = {
    closeModal: (history?: object) => void;
};
export type TSortableIngredientProps = {
    id: string;
    index: number;
    moveCard: (a: number, b: number) => void;
    name: string;
    image_mobile: string;
    price: number;
};
export type TLocation = {
    hash: string,
    key?: string
    pathname: string;
    search: string;
    state: any;
    background?: any;
    from?: { pathname: string }
};
type TOrderItem = {
    [key: string]: {
        amount: number,
        name: string,
        image: string,
        price: number,
        id: string
    }
};
export type TOrderData = {
    metaData: TOrderItem,
    keys: Array<string>,
    orderTotal: number
};
export type TProduct = {
    name: string;
    image_mobile: string;
    price: number;
};
