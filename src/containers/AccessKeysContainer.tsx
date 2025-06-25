import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import AccessKeys from '../components/AccessKeys';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function AccessKeysContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...usersActions, ...authActions, ...routesActions }, dispatch),
        [dispatch]
    );
    const accessKeys = useAppSelector(state => _.get(state, 'accessKeys', {}));
    const auth = useAppSelector(state => _.get(state, 'auth', {}));

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
        <AccessKeys
            isFetching={_.get(accessKeys, 'isFetching')}
            rs={_.get(accessKeys, 'rs')}
            removeKey={actions.reomveAccessKey}
            patchKey={actions.patchAccessKey}
            isCreating={_.get(accessKeys, 'isCreating')}
            createKey={actions.createAccessKey}
            isShowKey={_.get(accessKeys, 'showKey.isOpen')}
            close={actions.closePopShowKey}
            token={_.get(accessKeys, 'showKey.token')}
        />
    );
}
