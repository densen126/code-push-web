import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
    isFetching?: boolean;
    oldPassword?: string;
    newPassword?: string;
    newPasswordConfirm?: string;
    error?: any;
}

const initialState: PasswordState = {
    isFetching: false,
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
    error: null,
};

const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        passwordChangeOldInput(state, action: PayloadAction<string>) {
            state.oldPassword = action.payload;
            state.error = null;
        },
        passwordChangeNewInput(state, action: PayloadAction<string>) {
            state.newPassword = action.payload;
            state.error = null;
        },
        passwordChangeNewConfirmInput(state, action: PayloadAction<string>) {
            state.newPasswordConfirm = action.payload;
            state.error = null;
        },
        requestModifyPassword(state) {
            state.isFetching = true;
        },
        receiveModifyPassword(state) {
            state.isFetching = false;
        },
        receiveModifyPasswordError(state, action: PayloadAction<any>) {
            state.isFetching = false;
            state.error = action.payload;
        },
    },
});

export const {
    passwordChangeOldInput,
    passwordChangeNewInput,
    passwordChangeNewConfirmInput,
    requestModifyPassword,
    receiveModifyPassword,
    receiveModifyPasswordError,
} = passwordSlice.actions;

export default passwordSlice.reducer;
