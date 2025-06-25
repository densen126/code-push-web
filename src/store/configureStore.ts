import { configureStore as toolkitConfigureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';

export default function configureStore(initialState = {}, helpersConfig = {}) {
    const helpers = createHelpers(helpersConfig);
    const middleware = (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            thunk: { extraArgument: helpers },
            serializableCheck: false,
        }).concat(__DEV__ ? createLogger() : []);

    const store = toolkitConfigureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware,
    });

    if (__DEV__ && module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(require('../reducers').default);
        });
    }

    return store;
}
