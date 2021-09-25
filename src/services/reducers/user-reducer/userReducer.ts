import {preloadedState} from "../../preloadedState";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from '../../actions/user';
import {TUserActions, TUserState} from "../../types/user";

const initialState: TUserState = preloadedState.user;
export const userReducer = (state = initialState, action: TUserActions) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                login: {
                    request: true,
                    failed: false
                }
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                data: action.user,
                login: {
                    request: false,
                    failed: false
                }
            }
        }
        case LOGIN_FAIL: {
            return {
                ...state,
                login: {
                    request: false,
                    failed: true
                }
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logout: {
                    request: true,
                    failed: false
                }
            }
        }
        case LOGOUT_SUCCESS: {
            return preloadedState.user;
        }
        case LOGOUT_FAIL: {
            return {
                ...state,
                logout: {
                    request: false,
                    failed: true
                }
            }
        }
        case REGISTER_REQUEST: {
            return {
                ...state,
                register: {
                    request: true,
                    failed: false
                }
            }
        }
        case REGISTER_SUCCESS: {
            return {
                ...state,
                data: action.user,
                register: {
                    request: false,
                    failed: false
                }
            };
        }
        case REGISTER_FAIL: {
            return {
                ...state,
                register: {
                    request: false,
                    failed: true
                }
            };
        }
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPassword: {
                    request: true,
                    success: false
                }
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPassword: {
                    request: false,
                    success: true
                }
            }
        }
        case FORGOT_PASSWORD_FAIL: {
            return {
                ...state,
                forgotPassword: {
                    request: false,
                    success: false
                }
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPassword: {
                    request: true,
                    success: false
                }
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPassword: {
                    request: false,
                    success: true
                }
            }
        }
        case RESET_PASSWORD_FAIL: {
            return {
                ...state,
                resetPassword: {
                    request: false,
                    success: false
                }
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: {
                    request: true,
                    failed: false
                }
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                data: action.user,
                getUserRequest: {
                    request: false,
                    failed: false
                }
            }
        }
        case GET_USER_FAIL: {
            return {
                ...state,
                getUserRequest: {
                    request: false,
                    failed: true
                }
            }
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: {
                    request: true,
                    success: false
                }
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                data: action.user,
                updateUserRequest: {
                    request: false,
                    success: true
                }
            }
        }
        case UPDATE_USER_FAIL: {
            return {
                ...state,
                updateUserRequest: {
                    request: false,
                    success: false
                }
            }
        }
        default:
            return state;
    }
}