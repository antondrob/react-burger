export const preloadedState = {
    ingredients: {
        items: [],
        ingredientsRequest: false,
        ingredientsFailed: false
    },
    burger: {
        bun: null,
        notBun: []
    },
    ingredient: null,
    user: {
        data: null,
        login: {
            request: false,
            failed: false
        },
        logout: {
            request: false,
            failed: false
        },
        register: {
            request: false,
            failed: false
        },
        forgotPassword: {
            request: false,
            success: false
        },
        resetPassword: {
            request: false,
            success: false
        },
        getUserRequest: {
            request: false,
            failed: false
        },
        updateUserRequest: {
            request: false,
            success: false
        }
    }
};