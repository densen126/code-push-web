import type { Route } from 'universal-router';
import type { RouContext, RouteRes } from '../types';
import { requireLogin } from '../guards';

const usersRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/user-setting',
        action: async (ctx): Promise<RouteRes|null> => {
            const guard = requireLogin(ctx);
            if (guard) return null;
            const { default: UserSetting } = await import('@/pages/UserSetting');
            return {
                title: '设置',
                component: <UserSetting />,
            };
        },
    },
    // {
    //     path: '/users/:id',
    //     action: async (ctx, params): Promise<RouteRes> => {
    //         const guard = requireLogin(ctx);
    //         if (guard) return guard;

    //         const { default: UserProfile } = await import('@/pages/users/UserProfile');
    //         return {
    //             title: `用户 #${params.id}`,
    //             component: <UserProfile id="12" />,
    //         };
    //     },
    // },
];

export default usersRoutes;
