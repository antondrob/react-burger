export const preloadedState = {
    ingredients: {
        items: [],
        ingredientsRequest: false,
        ingredientsFailed: false,
    },
    burger: {
        bun: {},
        notBun: []
    },
    ingredient: {},
    order: {
        data: {},
        orderRequest: false,
        orderFailed: false,
    },
    tabs: [
        {
            id: 'bun',
            name: 'Булки',
            active: true
        },
        {
            id: 'sauce',
            name: 'Соусы',
            active: false
        },
        {
            id: 'main',
            name: 'Начинка',
            active: false
        }
    ]
};