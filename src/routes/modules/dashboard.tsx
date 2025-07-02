import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';
import { requireLogin } from '../guards';

const dashboardRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/dashboard',
        action: async (ctx): Promise<RouteRes> => {
            const guard = requireLogin(ctx);
            if (guard) return guard;
            const { default: Dashboard } = await import('@/pages/Dashboard');
            return {
                title: '仪表盘',
                component: <Dashboard />,
            };
        },
    },
];

export default dashboardRoutes;
