import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';
import { requireLogin } from '../guards';

const appsRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: ['/', '/apps'],
        action: async (ctx) => {
            const guard = requireLogin(ctx);
            if (guard) return null;
            const { default: Apps } = await import('@/pages/Apps');
            return {
                title: '应用管理',
                component: <Apps />,
            };
        },
    },
];

export default appsRoutes;
