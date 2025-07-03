import React from 'react';
import type { Route } from 'universal-router';
import type { RouteRes, RouContext } from '../types';

const RegisterContainer = React.lazy(() => import('@/pages/Register'));

const loginRoutes: Route<RouteRes, RouContext>[] = [
    {
        path: '/register',
        action: (): RouteRes => ({
            title: '注册',
            component: (
                <React.Suspense fallback={<div>Loading...</div>}>
                    <RegisterContainer />
                </React.Suspense>
            ),
        }),
    },
];

export default loginRoutes;
