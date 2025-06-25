import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import * as productsActions from '../actions/productsActions';
import ProductList from '../components/ProductList';
import PopAddAppContainer from './PopAddAppContainer';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function ProductListContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...usersActions, ...authActions, ...routesActions, ...productsActions }, dispatch),
        [dispatch]
    );
    const auth = useAppSelector(state => _.get(state, 'auth', {}));
    const products = useAppSelector(state => _.get(state, 'products', {}));

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
        <div>
            <PopAddAppContainer />
            <ProductList
                isFetching={_.get(products, 'isFetching')}
                rs={_.get(products, 'rs')}
                popAddApp={actions.showPopAddApp}
            />
        </div>
    );
}
