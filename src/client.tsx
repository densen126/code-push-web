// src/client.tsx
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { router } from './router';
import App from './components/App';

declare global {
    interface Window {
        __PRELOADED_STATE__?: any;
        __ROUTE_CONTEXT__?: any;
    }
}

const preloadedState = window.__PRELOADED_STATE__;
const initialContext = window.__ROUTE_CONTEXT__;

const store = createStore(preloadedState);

async function boot() {
    const context =
        initialContext ??
        (await router.resolve({ pathname: window.location.pathname }));

    hydrateRoot(
        document.getElementById('root')!,
        <Provider store={store}>
            <App context={context} />
        </Provider>
    );
}

boot();
