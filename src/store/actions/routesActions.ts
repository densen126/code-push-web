import type { History } from 'history';
import { Dispatch } from 'redux';
import { RootState } from '@/store';
import { setBackHistory, resetBackHistory } from './../slices/routes/reouteSlice';

// 返回上一次的 history
export const goBackHistory = (history: History) => (dispatch: Dispatch, getState: () => RootState) => {
    const historyUri = getState().routes.historyPath || '/';
    history.replace(historyUri);
    dispatch(resetBackHistory());
};

// 跳转首页
export const showHome = (history: History) => () => {
    history.replace('/');
};

// 跳转登录页
export const showLogin = (history: History) => () => {
    history.replace('/login');
};
