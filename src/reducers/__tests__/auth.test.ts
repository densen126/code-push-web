import { expect } from 'chai';
import { describe, it } from 'mocha';
import { auth, accessKeys } from '../auth';
import {
    REQUEST_AUTH,
    RECEIVE_AUTH,
    DELETE_AUTH,
    REQUEST_ACCESS_KEYS,
    RECEIVE_ACCESS_KEYS,
} from '../../actions/actionTypes';

describe('auth reducer', () => {
    it('handles auth flow', () => {
        let state = auth(undefined, { type: REQUEST_AUTH });
        expect(state).to.deep.equal({ isFetching: true });
        state = auth(state, { type: RECEIVE_AUTH, payload: 'token' });
        expect(state).to.deep.equal({ token: 'token', isFetching: false, isAuth: true });
        state = auth(state, { type: DELETE_AUTH });
        expect(state).to.deep.equal({ token: null, isAuth: false, isFetching: false });
    });
});

describe('accessKeys reducer', () => {
    it('stores received keys', () => {
        let state = accessKeys(undefined, { type: REQUEST_ACCESS_KEYS });
        expect(state).to.deep.equal({ isFetching: true });
        state = accessKeys(state, { type: RECEIVE_ACCESS_KEYS, payload: { accessKeys: ['a'] } });
        expect(state).to.deep.equal({ isFetching: false, rs: ['a'] });
    });
});
