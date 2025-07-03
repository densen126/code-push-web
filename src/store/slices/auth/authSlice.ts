import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { AuthState } from './types';
import restApi from '@/network/restApi';


const initialState: AuthState = {
    token: null,
    isFetching: false,
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        requestAuth(state) {
            state.isFetching = true;
        },
        receiveAuth(state, action) {
            const auth = _.get(action, 'payload');
            if (!_.isEmpty(auth)) {
                state.isAuth = true;
                // restApi.setAuthToken(['auth', auth]);
                state.token = auth;
            }
            state.isFetching = false;
        },
        saveAuth(state, action) {
            console.log(action)
            const auth = _.get(action, 'payload');
            // restApi.setAuthToken(['auth', auth]);
            sessionStorage.setItem('auth', auth);
            state.token = auth;
            state.isAuth = true;
        },
        deleteAuth(state) {
            restApi.deleteAuthToken();
            sessionStorage.removeItem('auth');
            state.token = null;
            state.isAuth = false;
        },
    }
});

export const { requestAuth, receiveAuth, saveAuth, deleteAuth } = authSlice.actions;
export default authSlice.reducer;
