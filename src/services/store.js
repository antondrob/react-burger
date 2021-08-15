import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers';
import {preloadedState} from './preloadedState';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [],
});