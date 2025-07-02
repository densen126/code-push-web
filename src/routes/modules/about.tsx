import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';
import About from '@/pages/About';

const aboutRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/about',
        action: (): RouteRes => ({
            title: '关于我们',
            component: <About />,
        }),
    },
];

export default aboutRoutes;
