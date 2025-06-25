import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import Product from '../components/Product';
import { useAppDispatch, useAppSelector } from '../hooks';

interface Props {
    appName: string;
}

export default function ProductContainer({ appName }: Props) {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...usersActions, ...authActions, ...routesActions }, dispatch),
        [dispatch]
    );
    const auth = useAppSelector(state => _.get(state, 'auth', {}));
    const deployments = useAppSelector(state => _.get(state, 'deployments', {}));

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

    return <Product appName={appName} items={_.get(deployments, `rs.${appName}`)} />;
}
