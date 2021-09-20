import * as actions from '../actions/user';
import {preloadedState} from "../preloadedState";
import {userReducer} from "./userReducer";

describe('User Reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(preloadedState.user);
    })
    // Login actions
    it('should handle LOGIN_REQUEST action', () => {
        const expected = {
            ...preloadedState.user,
            login: {
                request: true,
                failed: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.LOGIN_REQUEST
        });
        expect(received).toEqual(expected);
    })
    it('should handle LOGIN_SUCCESS action', () => {
        const expected = {
            ...preloadedState.user,
            data: {
                ...preloadedState.user.data,
                email: 'example@yandex.ru',
                name: 'Example'
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.LOGIN_SUCCESS,
            user: {
                email: 'example@yandex.ru',
                name: 'Example'
            }
        });
        expect(received).toEqual(expected);
    })
    it('should handle LOGIN_FAIL action', () => {
        const expected = {
            ...preloadedState.user,
            login: {
                request: false,
                failed: true
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.LOGIN_FAIL
        });
        expect(received).toEqual(expected);
    })
    // Logout actions
    it('should handle LOGOUT_REQUEST action', () => {
        const expected = {
            ...preloadedState.user,
            logout: {
                request: true,
                failed: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.LOGOUT_REQUEST
        });
        expect(received).toEqual(expected);
    })
    it('should handle LOGOUT_SUCCESS action', () => {
        const expected = {
            ...preloadedState.user,
            data: null
        };
        const received = userReducer(preloadedState.user, {
            type: actions.LOGOUT_SUCCESS
        });
        expect(received).toEqual(expected);
    })
    it('should handle LOGOUT_FAIL action', () => {
        const expected = {
            ...preloadedState.user,
            logout: {
                request: false,
                failed: true
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.LOGOUT_FAIL
        });
        expect(received).toEqual(expected);
    })
    // Register actions
    it('should handle REGISTER_REQUEST action', () => {
        const expected = {
            ...preloadedState.user,
            register: {
                request: true,
                failed: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.REGISTER_REQUEST
        });
        expect(received).toEqual(expected);
    })
    it('should handle REGISTER_SUCCESS action', () => {
        const expected = {
            ...preloadedState.user,
            data: {
                ...preloadedState.user.data,
                email: 'example@yandex.ru',
                name: 'Example'
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.REGISTER_SUCCESS,
            user: {
                email: 'example@yandex.ru',
                name: 'Example'
            }
        });
        expect(received).toEqual(expected);
    })
    it('should handle REGISTER_FAIL action', () => {
        const expected = {
            ...preloadedState.user,
            register: {
                request: false,
                failed: true
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.REGISTER_FAIL
        });
        expect(received).toEqual(expected);
    })
    // Forgot password actions
    it('should handle FORGOT_PASSWORD_REQUEST action', () => {
        const expected = {
            ...preloadedState.user,
            forgotPassword: {
                request: true,
                success: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.FORGOT_PASSWORD_REQUEST
        });
        expect(received).toEqual(expected);
    })
    it('should handle FORGOT_PASSWORD_SUCCESS action', () => {
        const expected = {
            ...preloadedState.user,
            forgotPassword: {
                request: false,
                success: true
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.FORGOT_PASSWORD_SUCCESS
        });
        expect(received).toEqual(expected);
    })
    it('should handle FORGOT_PASSWORD_FAIL action', () => {
        const expected = {
            ...preloadedState.user,
            forgotPassword: {
                request: false,
                success: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.FORGOT_PASSWORD_FAIL
        });
        expect(received).toEqual(expected);
    })
    // Reset password actions
    it('should handle RESET_PASSWORD_REQUEST action', () => {
        const expected = {
            ...preloadedState.user,
            resetPassword: {
                request: true,
                success: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.RESET_PASSWORD_REQUEST
        });
        expect(received).toEqual(expected);
    })
    it('should handle RESET_PASSWORD_SUCCESS action', () => {
        const expected = {
            ...preloadedState.user,
            resetPassword: {
                request: false,
                success: true
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.RESET_PASSWORD_SUCCESS
        });
        expect(received).toEqual(expected);
    })
    it('should handle RESET_PASSWORD_FAIL action', () => {
        const expected = {
            ...preloadedState.user,
            resetPassword: {
                request: false,
                success: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.RESET_PASSWORD_FAIL
        });
        expect(received).toEqual(expected);
    })
    // Get user actions
    it('should handle GET_USER_REQUEST action', () => {
        const expected = {
            ...preloadedState.user,
            getUserRequest: {
                request: true,
                failed: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.GET_USER_REQUEST
        });
        expect(received).toEqual(expected);
    })
    it('should handle GET_USER_SUCCESS action', () => {
        const expected = {
            ...preloadedState.user,
            data: {
                ...preloadedState.user.data,
                email: 'example@yandex.ru',
                name: 'Example'
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.GET_USER_SUCCESS,
            user: {
                email: 'example@yandex.ru',
                name: 'Example'
            }
        });
        expect(received).toEqual(expected);
    })
    it('should handle GET_USER_FAIL action', () => {
        const expected = {
            ...preloadedState.user,
            getUserRequest: {
                request: false,
                failed: true
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.GET_USER_FAIL
        });
        expect(received).toEqual(expected);
    })
    // Update user actions
    it('should handle UPDATE_USER_REQUEST action', () => {
        const expected = {
            ...preloadedState.user,
            updateUserRequest: {
                request: true,
                success: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.UPDATE_USER_REQUEST
        });
        expect(received).toEqual(expected);
    })
    it('should handle UPDATE_USER_SUCCESS action', () => {
        const expected = {
            ...preloadedState.user,
            data: {
                ...preloadedState.user.data,
                email: 'example@yandex.ru',
                name: 'Example'
            },
            updateUserRequest: {
                request: false,
                success: true
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.UPDATE_USER_SUCCESS,
            user: {
                email: 'example@yandex.ru',
                name: 'Example'
            }
        });
        expect(received).toEqual(expected);
    })
    it('should handle UPDATE_USER_FAIL action', () => {
        const expected = {
            ...preloadedState.user,
            updateUserRequest: {
                request: false,
                success: false
            }
        };
        const received = userReducer(preloadedState.user, {
            type: actions.UPDATE_USER_FAIL
        });
        expect(received).toEqual(expected);
    })
})