import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';
import Document from '@/pages/Document';

const documentRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/document',
        action: () => ({
            title: '首页',
            component: <Document />,
        }),
    },
];

export default documentRoutes;
