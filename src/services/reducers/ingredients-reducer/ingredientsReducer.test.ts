import {ingredientsReducer} from './ingredientsReducer';
import {preloadedState} from '../../preloadedState';
import * as actions from '../../actions/ingredients';
import {GET_INGREDIENTS_REQUEST} from "../../actions/ingredients";

const testIngredients = [
    {
        _id: '60d3b41abdacab0026a733c6',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733c7',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733c8',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733c9',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733ca',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733cb',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733cc',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
    },
    {
        _id: '60d3b41abdacab0026a733cd',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0
    }
];
describe('Ingredients Reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, <any>{})).toEqual(preloadedState.ingredients)
    })
    it('should handle GET_INGREDIENTS_REQUEST action', () => {
        const expected = {
            ...preloadedState.ingredients,
            ingredientsRequest: true
        };
        const received = ingredientsReducer(preloadedState.ingredients, {type: actions.GET_INGREDIENTS_REQUEST});
        expect(received).toEqual(expected);
    })
    it('should handle GET_INGREDIENTS_FAIL action', () => {
        const initialState = {
            ...preloadedState.ingredients,
            ingredientsRequest: true
        };
        const expected = {
            ...preloadedState.ingredients,
            ingredientsFailed: true
        };
        const received = ingredientsReducer(preloadedState.ingredients, {type: actions.GET_INGREDIENTS_FAIL});
        expect(received).toEqual(expected);
    })
    it('should handle GET_INGREDIENTS_SUCCESS action', () => {
        const initialState = {
            ...preloadedState.ingredients,
            ingredientsRequest: true
        };
        const expected = {
            ...preloadedState.ingredients,
            items: testIngredients
        }
        // @ts-ignore
        const received = ingredientsReducer(initialState, {
            type: actions.GET_INGREDIENTS_SUCCESS,
            ingredients: testIngredients
        })
        expect(received).toEqual(expected);
    })
})