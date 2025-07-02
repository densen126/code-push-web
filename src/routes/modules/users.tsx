import type { Route } from 'universal-router';
import type { RouContext, RouteRes } from '../types';
import { requireLogin } from '../guards';

const usersRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/users',
        action: async (): Promise<RouteRes> => {
            const { default: UserList } = await import('@/pages/users/UserList');
            return {
                title: '用户列表',
                component: <UserList />,
            };
        },
    },
    {
        path: '/users/:id',
        action: async (ctx, params): Promise<RouteRes> => {
            const guard = requireLogin(ctx);
            if (guard) return guard;

            const { default: UserProfile } = await import('@/pages/users/UserProfile');
            return {
                title: `用户 #${params.id}`,
                component: <UserProfile id="12" />,
            };
        },
    },
];

export default usersRoutes;
