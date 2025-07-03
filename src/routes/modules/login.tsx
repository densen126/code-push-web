import React from 'react';
import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';

const LoginContainer = React.lazy(() => import('@/pages/Login'));

const loginRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/login',
        action: (ctx): RouteRes => {
            const { history, pathname } = ctx;
            return {
                title: '登录',
                component: (
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <LoginContainer context={{ history, pathname }} />
                    </React.Suspense>
                ),
            }
        },
    },
];

export default loginRoutes;
