import type { AppDispatch } from '@/store';
import restApi from '@/network/restApi';
import {
    requestAuth,
    receiveAuth,
    saveAuth,
    deleteAuth,
} from '@/store/slices/auth/authSlice';
import { showLogin } from './routesActions';

export const fetchAuth = (isLogin = false) => (dispatch: AppDispatch) => {
    dispatch(requestAuth());
    const auth = sessionStorage.getItem('auth');
    if (auth) {
        dispatch(receiveAuth(auth));
    } else {
        dispatch(receiveAuth(null));
        if (isLogin) {
            // dispatch(showLogin());
        }
    }
};

export function checkResponseAuth(dispatch: AppDispatch, data: any) {
    if (data.httpCode === 401) {
        dispatch(fetchAuth(true));
    }
}

