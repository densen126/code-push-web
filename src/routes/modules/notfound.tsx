import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';

const notFound: Route<RouteRes, RouContext>[] = [
    {
        path: '(.*)',
        action: () => ({
            title: '页面未找到',
            component: <div>404 Not Found</div>,
        }),
    },
];

export default notFound;
