import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoutesState {
    historyPath?: string;
}

const initialState: RoutesState = {
    historyPath: '/',
};

const routesSlice = createSlice({
    name: 'routes',
    initialState,
    reducers: {
        setBackHistory(state, action: PayloadAction<string>) {
            state.historyPath = action.payload;
        },
        resetBackHistory(state) {
            state.historyPath = '/';
        }
    },
});

export const { setBackHistory, resetBackHistory } = routesSlice.actions;
export default routesSlice.reducer;
