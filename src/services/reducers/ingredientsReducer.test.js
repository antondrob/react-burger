import {ingredientsReducer} from './ingredientsReducer';
import {preloadedState} from '../preloadedState';
import * as actions from '../actions/ingredients';
import {GET_INGREDIENTS_REQUEST} from "../actions/ingredients";

describe('Ingredients Reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(preloadedState.ingredients)
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
            items: 'items body'
        }
        const received = ingredientsReducer(initialState, {
            type: actions.GET_INGREDIENTS_SUCCESS,
            ingredients: 'items body'
        })
        expect(received).toEqual(expected);
    })
})