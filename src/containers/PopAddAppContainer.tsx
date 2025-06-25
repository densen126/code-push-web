import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import * as productsActions from '../actions/productsActions';
import PopAddApp from '../components/PopAddApp';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function PopAddAppContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...usersActions, ...authActions, ...routesActions, ...productsActions }, dispatch),
        [dispatch]
    );
    const auth = useAppSelector(state => _.get(state, 'auth', {}));
    const addProducts = useAppSelector(state => _.get(state, 'addProducts', {}));

    useEffect(() => {
        if (!_.get(auth, 'isAuth')) {
            let path = location.pathname;
            if (!_.isEmpty(location.search)) {
                path += `?${location.search}`;
            }
            actions.setBackHistory(path);
            actions.fetchAuth(true);
        }
    }, [auth, actions]);

    return (
        <PopAddApp
            {...addProducts}
            input={actions.popAddAppInput}
            close={actions.closePopAddApp}
            onSubmit={() => {
                const appName = _.get(addProducts, 'appName');
                const os = _.get(addProducts, 'os');
                const platform = _.get(addProducts, 'platform');
                actions.addProducts(appName, os, platform);
            }}
        />
    );
}
