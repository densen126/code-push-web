// src/store/actions/loginActions.ts
import type { AppDispatch } from '@/store'; // 你的 store 类型
import restApi from '@/network/restApi';
import _ from 'lodash';
import {
    loginChangeAccountInput,
    loginChangePasswordInput,
    requestLogin,
    receiveLogin,
    receiveLoginError,
} from '@/store/slices/users/loginSlice';
import {
    passwordChangeOldInput,
    passwordChangeNewInput,
    passwordChangeNewConfirmInput,
    requestModifyPassword,
    receiveModifyPassword,
    receiveModifyPasswordError,
} from '@/store/slices/users/passwordSlice';
import { saveAuth, deleteAuth } from '@/store/slices/auth/authSlice';
import { showLogin } from './routesActions';
import { addShowMsg } from '@/store/slices/msg/msgStackSlice';
import { checkResponseAuth } from '@/store/actions/authActions';

// 登出
export const logout = () => (dispatch: AppDispatch) => {
    dispatch(deleteAuth());
    // 可在 reducer 里加 USER_LOGOUT 状态，或直接用 auth 状态切换
};

// 登录异步 action
export const fetchLogin = (account: string, password: string) => async (dispatch: AppDispatch) => {
    dispatch(requestLogin());
    const data = await restApi.login(account, password);
    const auth = _.get(data, 'results.tokens');
    if (!_.isEmpty(auth)) {
        dispatch(saveAuth(auth));
        dispatch(receiveLogin(data));
    } else {
        dispatch(receiveLoginError({ errorMessage: _.get(data, 'errorMessage') }));
    }
};

// 修改密码异步 action
export const modifyPassword = (oldPassword: string, newPassword: string) => async (dispatch: AppDispatch) => {
    dispatch(requestModifyPassword());
    const data = await restApi.password(oldPassword, newPassword);
    checkResponseAuth(dispatch, data);
    if (_.get(data, 'status') === "OK") {
        dispatch(deleteAuth());
        dispatch(receiveModifyPassword(data));
        // dispatch(showLogin());
    } else {
        dispatch(receiveModifyPasswordError({ message: _.get(data, 'message') }));
    }
};
