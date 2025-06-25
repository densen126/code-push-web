import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';
import Login from '../components/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function LoginContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...usersActions, ...routesActions }, dispatch),
        [dispatch]
    );
    const login = useAppSelector(state => _.get(state, 'login', {}));
    const auth = useAppSelector(state => _.get(state, 'auth', {}));

    useEffect(() => {
        if (_.get(auth, 'isAuth')) {
            actions.goBackHistory();
        }
    }, [auth, actions]);

    return (
        <div>
            <Header />
            <Login
                isFetching={_.get(login, 'isFetching')}
                account={_.get(login, 'account')}
                password={_.get(login, 'password')}
                accountInputChange={actions.loginChangeAccountInput}
                passwordInputChange={actions.loginChangePasswordInput}
                submit={() => actions.fetchLogin(_.get(login, 'account'), _.get(login, 'password'))}
                error={_.get(login, 'error')}
            />
            <Footer />
        </div>
    );
}
