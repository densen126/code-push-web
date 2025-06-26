import React from 'react';
import { hydrateRoot, Root } from 'react-dom/client';
import UniversalRouter from 'universal-router';
import queryString from 'query-string';
import { createPath, Action as HistoryAction } from 'history';
import history from './core/history';
import App from './components/App';
import configureStore from './store/configureStore';
import { updateMeta } from './core/DOMUtils';
import { ErrorReporter } from './core/devUtils';

interface ExtendedLocation {
  pathname: string;
  search: string;
  hash: string;
  key: string;
  state?: unknown;
}

type Action = typeof HistoryAction;

const context: any = {
    insertCss: (...styles: any[]) => {
        const removeCss = styles.map(x => x._insertCss());
        return () => { removeCss.forEach(f => f()); };
    },
    store: configureStore((window as any).APP_STATE, { history }),
};

const scrollPositionsHistory: Record<string, { scrollX: number, scrollY: number }> = {};
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

let onRenderComplete: (route: any, location: ExtendedLocation) => void = function initialRenderComplete() {
    const elem = document.getElementById('css');
    if (elem) elem.parentNode?.removeChild(elem);
    onRenderComplete = function renderComplete(route: any, location: ExtendedLocation) {
        document.title = route.title;
        updateMeta('description', route.description);

        let scrollX = 0;
        let scrollY = 0;
        const pos = scrollPositionsHistory[location.key];
        if (pos) {
            scrollX = pos.scrollX;
            scrollY = pos.scrollY;
        } else {
            const targetHash = location.hash.substr(1);
            if (targetHash) {
                const target = document.getElementById(targetHash);
                if (target) {
                    scrollY = window.pageYOffset + target.getBoundingClientRect().top;
                }
            }
        }

        window.scrollTo(scrollX, scrollY);

        if (typeof window.ga === 'function') {
            window.ga('send', 'pageview', createPath(location));
        }
    };
};

const container = document.getElementById('app');
let root: Root | null = null;
let currentLocation: ExtendedLocation = history.location;
let routes = require('./routes').default;

async function onLocationChange(location: ExtendedLocation, action?: Action) {
    scrollPositionsHistory[currentLocation.key] = {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
    };
    if (action === 'PUSH') {
        delete scrollPositionsHistory[location.key];
    }
    currentLocation = location;

    try {
        const router = new UniversalRouter(routes, {context: context});
        const route = await router.resolve({
            pathname: location.pathname,
            query: queryString.parse(location.search),
        });

        if (currentLocation.key !== location.key) return;

        if (route.redirect) {
            history.replace(route.redirect);
            return;
        }

        const element = <App context={context}>{route.component}</App>;
        if (!root) {
            root = hydrateRoot(container as Element, element);
        } else {
            root.render(element);
        }

        onRenderComplete(route, location);
    } catch (error: any) {
        if (__DEV__) {
            root = null;
            document.title = `Error: ${error.message}`;
            hydrateRoot(container as Element, <ErrorReporter error={error} />);
            throw error;
        }

        console.error(error);
        if (action && currentLocation.key === location.key) {
            window.location.reload();
        }
    }
}

history.listen(onLocationChange);
onLocationChange(currentLocation);

if (__DEV__) {
    window.addEventListener('error', (event: ErrorEvent) => {
        root = null;
        document.title = `Runtime Error: ${event.error.message}`;
        hydrateRoot(container as Element, <ErrorReporter error={event.error} />);
    });
}

if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require('./routes').default;
        onLocationChange(currentLocation);
    });
}
