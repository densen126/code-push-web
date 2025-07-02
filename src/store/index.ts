import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

export const createStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        devTools: process.env.NODE_ENV !== 'production'
    });
};

export type AppStore = ReturnType<typeof createStore>;
// export type AppState = ReturnType<AppStore['getState']>;
export type AppState = RootState;
export type AppDispatch = AppStore['dispatch'];

