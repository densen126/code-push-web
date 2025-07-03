import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';
import AccessKeys from '@/pages/AccessKeys';
import { requireLogin } from '../guards';

const accessKeysRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/access-keys',
        action: (ctx): RouteRes | null => {
            const guard = requireLogin(ctx);
            if (guard) return null;
            return {
                title: '我的秘钥',
                component: <AccessKeys />,
            }
        },
    },
];

export default accessKeysRoutes;
