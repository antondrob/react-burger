import {
    LOGIN_URL,
    REGISTER_URL,
    FORGOT_PASSWORD_URL,
    RESET_PASSWORD_URL,
    TWENTY_FOUR_HOURS,
    LOGOUT_URL,
    USER_URL,
    TOKEN_URL
} from "../appVariables";
import {checkResponse, deleteCookie, deleteCookies, getCookie, setCookie} from "../helperFunctions";

// Login actions
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
// Logout actions
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
// Register actions
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
// Forgot password actions
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
// Reset password actions
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';
// Get user actions
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';
// Update user actions
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const refreshToken = (afterRefresh, call = false) => async (dispatch) => {
    return await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'token=' + getCookie('refreshToken')
    }).then(checkResponse)
        .then(res => {
            if (res.success) {
                setCookie('accessToken', res.accessToken, {"max-age": TWENTY_FOUR_HOURS})
                setCookie('refreshToken', res.refreshToken, {"max-age": TWENTY_FOUR_HOURS});
                dispatch(afterRefresh);
            } else {
                throw new Error(res.message);
            }
        })
        .catch(error => {
            alert(error.message);
            deleteCookies(['accessToken', 'refreshToken']);
        });
}

export const login = (email, password) => (dispatch) => {
    dispatch({
        type: LOGIN_REQUEST
    });
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                setCookie('accessToken', res.accessToken, {"max-age": TWENTY_FOUR_HOURS})
                setCookie('refreshToken', res.refreshToken, {"max-age": TWENTY_FOUR_HOURS});
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: {
                        ...res.user,
                        password: password
                    }
                });
            } else {
                throw new Error(res.message);
            }
        })
        .catch(error => {
            dispatch({
                type: LOGIN_FAIL
            });
            alert(error.message);
        });
}

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT_REQUEST
    });
    return fetch(LOGOUT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'token': getCookie('refreshToken')
        })
    })
        .then(checkResponse)
        .then(async res => {
            if (res.success) {
                deleteCookie('accessToken');
                deleteCookie('refreshToken');
                dispatch({
                    type: LOGOUT_SUCCESS
                });
            } else {
                throw new Error(res.message);
            }
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_FAIL
            });
            alert(error.message);
        });
}

export const register = (email, password, name) => (dispatch) => {
    dispatch({
        type: REGISTER_REQUEST
    });
    return fetch(REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name})
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                setCookie('accessToken', res.accessToken, {"max-age": TWENTY_FOUR_HOURS})
                setCookie('refreshToken', res.refreshToken, {"max-age": TWENTY_FOUR_HOURS});
                dispatch({
                    type: REGISTER_SUCCESS,
                    user: {
                        ...res.user,
                        password: password
                    }
                });
            } else {
                throw new Error(res.message);
            }
        }).catch(error => {
            dispatch({
                type: REGISTER_FAIL
            });
            alert(error.message);
        });
}

export const forgotPassword = (email) => (dispatch) => {
    dispatch({
        type: FORGOT_PASSWORD_REQUEST
    });
    return fetch(FORGOT_PASSWORD_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                dispatch({
                    type: FORGOT_PASSWORD_SUCCESS
                });
            } else {
                throw new Error(res.message);
            }
        }).catch(error => {
            dispatch({
                type: FORGOT_PASSWORD_FAIL
            });
            alert(error.message);
        });
}

export const resetPassword = (password, token) => (dispatch) => {
    dispatch({
        type: RESET_PASSWORD_REQUEST
    });
    return fetch(RESET_PASSWORD_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, token})
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                dispatch({
                    type: RESET_PASSWORD_SUCCESS
                });
            } else {
                throw new Error(res.message);
            }
        }).catch(error => {
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            alert(error.message);
        });
}

export const getUser = (password) => (dispatch) => {
    dispatch({
        type: GET_USER_REQUEST
    });
    return fetch(USER_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('accessToken')
        }
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    user: {
                        ...res.user,
                        password: password
                    }
                });
                return true;
            } else {
                throw new Error(res.message);
            }
        })
        .catch(error => {
            if (error.message === 'jwt expired' || error.message === 'invalid signature') {
                dispatch(refreshToken(getUser()));
            } else {
                dispatch({
                    type: GET_USER_FAIL
                });
                deleteCookies(['accessToken', 'refreshToken']);
                alert(error.message);
            }
        });
}

export const updateUser = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_USER_REQUEST
    });
    return fetch(USER_URL, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getCookie('accessToken')
        },
        body: JSON.stringify(data)
    })
        .then(checkResponse)
        .then(res => {
            if (res.success) {
                dispatch({
                    type: UPDATE_USER_SUCCESS,
                    user: {
                        ...res.user,
                        password: data.password
                    }
                });
                return true;
            } else {
                throw new Error(res.message);
            }
        })
        .catch(error => {
            if (error.message === 'jwt expired' || error.message === 'invalid signature') {
                dispatch(refreshToken(updateUser(data)));
            } else {
                dispatch({
                    type: UPDATE_USER_FAIL
                });
                deleteCookies(['accessToken', 'refreshToken']);
                alert(error.message);
            }
        });
}