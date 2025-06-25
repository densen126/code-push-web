// src/store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

// 简单的计数器 slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment(state) { state.value += 1; },
        decrement(state) { state.value -= 1; },
    },
});

export const { increment, decrement } = counterSlice.actions;

// 创建 store
const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
    },
});

export default store;
