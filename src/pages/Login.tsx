import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import * as loginActions from '@/store/slices/users/loginSlice';
import * as userActions from '@/store/actions/usersActions';
import * as passwordActions from '@/store/slices/users/passwordSlice';
import * as routesActions from '@/store/actions/routesActions';
import Login from '@/components/login/Login';

function LoginPage() {
    // 从 state 里拿数据
    const login = useSelector((state: any) => state.login || {});
    const auth = useSelector((state: any) => state.auth || {});

    const dispatch = useDispatch<AppDispatch>();

    // 合并所有 action
    const actions = {
        ...loginActions,
        ...userActions,
        ...passwordActions,
        ...routesActions
    };

    // 登录按钮
    const handleSubmit = useCallback(() => {
        dispatch(actions.fetchLogin(login.account, login.password));
    }, [login.account, login.password, dispatch]);

    // 登录输入框变化
    const accountInputChange = useCallback((v: string) => {
        dispatch(actions.loginChangeAccountInput(v));
    }, [dispatch]);

    const passwordInputChange = useCallback((v: string) => {
        dispatch(actions.loginChangePasswordInput(v));
    }, [dispatch]);

    // 登录成功自动跳转
    useEffect(() => {
        if (auth.isAuth) {
            // dispatch(actions.goBackHistory());
        }
        // eslint-disable-next-line
    }, [auth.isAuth]);

    return (
        <div>
            <Login
                isFetching={login.isFetching}
                account={login.account}
                password={login.password}
                accountInputChange={accountInputChange}
                passwordInputChange={passwordInputChange}
                submit={handleSubmit}
                error={login.error}
            />
        </div>
    );
}

export default LoginPage;
