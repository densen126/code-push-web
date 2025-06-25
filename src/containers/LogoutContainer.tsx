import { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as routesActions from '../actions/routesActions';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function LogoutContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...usersActions, ...routesActions }, dispatch),
        [dispatch]
    );
    const auth = useAppSelector(state => _.get(state, 'auth', {}));

    useEffect(() => {
        if (_.get(auth, 'isAuth')) {
            actions.logout();
        }
        actions.showHome();
    }, [auth, actions]);

    return null;
}
