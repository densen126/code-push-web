import React, { useEffect, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as usersActions from '../actions/usersActions';
import * as authActions from '../actions/authActions';
import * as routesActions from '../actions/routesActions';
import ChangePassword from '../components/ChangePassword';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function ChangePasswordContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...usersActions, ...authActions, ...routesActions }, dispatch),
        [dispatch]
    );
    const auth = useAppSelector(state => _.get(state, 'auth', {}));
    const password = useAppSelector(state => _.get(state, 'password', {}));

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

    const oldPassword = _.get(password, 'oldPassword');
    const newPassword = _.get(password, 'newPassword');

    return (
        <ChangePassword
            isFetching={_.get(password, 'isFetching')}
            oldPassword={oldPassword}
            oldPasswordInputChange={actions.passwordChangeOldInput}
            newPassword={newPassword}
            newPasswordInputChange={actions.passwordChangeNewInput}
            newPasswordConfirm={_.get(password, 'newPasswordConfirm')}
            newPasswordConfirmInputChange={actions.passwordChangeNewConfirmInput}
            submit={() => actions.modifyPassword(oldPassword, newPassword)}
            error={_.get(password, 'error')}
        />
    );
}
