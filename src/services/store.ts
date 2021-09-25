import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './reducers';
import {socketMiddleware} from './middlewares/websocetMiddleware';
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk, socketMiddleware],
    enhancers: []
});
export type TRootStore = ReturnType<typeof rootReducer>;