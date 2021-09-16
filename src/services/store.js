import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers';
import {preloadedState} from './preloadedState';
import {socketMiddleware} from './middlewares/websocetMiddleware';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    middleware: [thunk, socketMiddleware],
    enhancers: []
});