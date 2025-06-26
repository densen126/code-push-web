// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export function createStore(preloadedState?: any) {
    return configureStore({
        reducer: { counter: counterReducer },
        preloadedState
    });
}

// 用一个临时 store 来推断类型
const _store = createStore();
export type RootState = ReturnType<typeof _store.getState>;
export type AppDispatch = typeof _store.dispatch;
