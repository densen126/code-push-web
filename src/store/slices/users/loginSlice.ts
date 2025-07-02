import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
    isFetching?: boolean;
    account?: string;
    password?: string;
    error?: any;
}

const initialState: LoginState = {
    isFetching: false,
    account: '',
    password: '',
    error: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginChangeAccountInput(state, action: PayloadAction<string>) {
            state.account = action.payload;
        },
        loginChangePasswordInput(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        requestLogin(state) {
            state.isFetching = true;
        },
        receiveLogin(state) {
            state.isFetching = false;
            state.password = '';
            state.error = null;
        },
        receiveLoginError(state, action: PayloadAction<any>) {
            state.isFetching = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginChangeAccountInput,
    loginChangePasswordInput,
    requestLogin,
    receiveLogin,
    receiveLoginError,
} = loginSlice.actions;

export default loginSlice.reducer;
