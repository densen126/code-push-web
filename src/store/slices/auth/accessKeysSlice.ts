import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { AccessKeysState } from './types';

const initialState: AccessKeysState = {
    isFetching: false,
    isRemoving: false,
    isCreating: false,
    rs: [],
    showKey: { isOpen: false, token: '' }
};

const accessKeysSlice = createSlice({
    name: 'accessKeys',
    initialState,
    reducers: {
        requestAccessKeys(state) {
            state.isFetching = true;
        },
        receiveAccessKeys(state, action) {
            state.isFetching = false;
            state.rs = _.get(action, 'payload.accessKeys') || [];
        },
        requestRemoveAccessKey(state) {
            state.isRemoving = true;
        },
        receiveRemoveAccessKey(state, action) {
            const friendlyName = _.get(action, 'payload.results.friendlyName');
            _.remove(state.rs, row => _.get(row, 'friendlyName') === friendlyName);
            state.isRemoving = false;
        },
        requestPatchAccessKey(state) {},
        receivePatchAccessKey(state, action) {
            const friendlyName = _.get(action, 'payload.friendlyName');
            const index = _.findIndex(state.rs, row => _.get(row, 'friendlyName') === friendlyName);
            if (_.get(action, 'payload.results.accessKey')) {
                state.rs[index] = _.get(action, 'payload.results.accessKey');
            }
        },
        requestCreateAccessKey(state) {
            state.isCreating = true;
        },
        receiveCreateAccessKey(state, action) {
            if (_.get(action, 'payload.results.accessKey')) {
                state.rs.unshift(_.get(action, 'payload.results.accessKey'));
            }
            state.isCreating = false;
        },
        openPopShowKey(state, action) {
            state.showKey = {
                isOpen: !!action.payload,
                token: action.payload || '',
            };
        },
        closePopShowKey(state) {
            state.showKey = { isOpen: false, token: '' };
        }
    }
});

export const {
    requestAccessKeys,
    receiveAccessKeys,
    requestRemoveAccessKey,
    receiveRemoveAccessKey,
    requestPatchAccessKey,
    receivePatchAccessKey,
    requestCreateAccessKey,
    receiveCreateAccessKey,
    openPopShowKey,
    closePopShowKey,
} = accessKeysSlice.actions;

export default accessKeysSlice.reducer;
