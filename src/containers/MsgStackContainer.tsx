import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import MsgStack from '../components/MsgStack';
import * as msgStackActions from '../actions/msgStackActions';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function MsgStackContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(
        () => bindActionCreators({ ...msgStackActions }, dispatch),
        [dispatch]
    );
    const msgStack = useAppSelector(state => _.get(state, 'msgStack', {}));

    return (
        <div style={{ position: 'fixed', top: 80, right: 20, minWidth: 100, maxWidth: 300 }}>
            <MsgStack items={_.get(msgStack, 'rs', [])} close={(id) => actions.closeMsg(id)} />
        </div>
    );
}
