import * as types from "../../actions/user";
import {TIngredient, TWsOrder} from "../index";

export type TUser = {
    email: string;
    name: string;
    password?: string;
};
export type TUserState = {
    data: TUser | null;
    login: {
        request: boolean,
        failed: boolean
    };
    logout: {
        request: boolean,
        failed: boolean
    };
    register: {
        request: boolean,
        failed: boolean
    };
    forgotPassword: {
        request: boolean,
        success: boolean
    };
    resetPassword: {
        request: boolean,
        success: boolean
    };
    getUserRequest: {
        request: boolean,
        failed: boolean
    };
    updateUserRequest: {
        request: boolean,
        success: boolean
    };
};
export type TUserRequestResponse = {
    user: TUser;
    success?: boolean;
} & Response;
// Login types
type TLoginRequestAction = {
    type: typeof types.LOGIN_REQUEST;
};
type TLoginSuccessAction = {
    type: typeof types.LOGIN_SUCCESS;
    user: TUser;
};
type TLoginFailAction = {
    type: typeof types.LOGIN_FAIL;
};
// Logout types
type TLogoutRequestAction = {
    type: typeof types.LOGOUT_REQUEST;
};
type TLogoutSuccessAction = {
    type: typeof types.LOGOUT_SUCCESS;
};
type TLogoutFailAction = {
    type: typeof types.LOGOUT_FAIL;
};
// Register types
type TRegisterRequestAction = {
    type: typeof types.REGISTER_REQUEST;
};
type TRegisterSuccessAction = {
    type: typeof types.REGISTER_SUCCESS;
    user: TUser;
};
type TRegisterFailAction = {
    type: typeof types.REGISTER_FAIL;
};
// Forgot password types
type TForgotPasswordRequestAction = {
    type: typeof types.FORGOT_PASSWORD_REQUEST;
};
type TForgotPasswordSuccessAction = {
    type: typeof types.FORGOT_PASSWORD_SUCCESS;
};
type TForgotPasswordFailAction = {
    type: typeof types.FORGOT_PASSWORD_FAIL;
};
// Reset password types
type TResetPasswordRequestAction = {
    type: typeof types.RESET_PASSWORD_REQUEST;
};
type TResetPasswordSuccessAction = {
    type: typeof types.RESET_PASSWORD_SUCCESS;
};
type TResetPasswordFailAction = {
    type: typeof types.RESET_PASSWORD_FAIL;
};
// Get user types
type TGetUserRequestAction = {
    type: typeof types.GET_USER_REQUEST;
};
type TGetUserSuccessAction = {
    type: typeof types.GET_USER_SUCCESS;
    user: TUser;
};
type TGetUserFailAction = {
    type: typeof types.GET_USER_FAIL;
};
// Update user types
type TUpdateUserRequestAction = {
    type: typeof types.UPDATE_USER_REQUEST;
};
type TUpdateUserSuccessAction = {
    type: typeof types.UPDATE_USER_SUCCESS;
    user: TUser;
};
type TUpdateUserFailAction = {
    type: typeof types.UPDATE_USER_FAIL;
};
export type TUserLoginActions =
    TLoginRequestAction
    | TLoginSuccessAction
    | TLoginFailAction;

export type TUserLogoutActions =
    TLogoutRequestAction
    | TLogoutSuccessAction
    | TLogoutFailAction;

export type TUserRegisterActions =
    TRegisterRequestAction
    | TRegisterSuccessAction
    | TRegisterFailAction;

export type TForgotPasswordActions =
    TForgotPasswordRequestAction
    | TForgotPasswordSuccessAction
    | TForgotPasswordFailAction;

export type TResetPasswordActions =
    TResetPasswordRequestAction
    | TResetPasswordSuccessAction
    | TResetPasswordFailAction;

export type TUserGetActions =
    TGetUserRequestAction
    | TGetUserSuccessAction
    | TGetUserFailAction;

export type TUserUpdateActions =
    TUpdateUserRequestAction
    | TUpdateUserSuccessAction
    | TUpdateUserFailAction;

export type TUserActions =
    TUserLoginActions
    | TUserLogoutActions
    | TUserRegisterActions
    | TForgotPasswordActions
    | TResetPasswordActions
    | TUserGetActions
    | TUserUpdateActions;