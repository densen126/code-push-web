import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';
import Home from '@/pages/Home';

const homeRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/',
        action: () => ({
            title: '首页',
            component: <Home />,
        }),
    },
];

export default homeRoutes;
