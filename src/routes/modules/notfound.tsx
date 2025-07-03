import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';
import NotFoundPage from '@/pages/NotFoundPage';

const notFound: Route<RouteRes, RouContext>[] = [
    {
        path: '(.*)',
        action: () => ({
            title: '页面未找到',
            component: <NotFoundPage />,
        }),
    },
];

export default notFound;
