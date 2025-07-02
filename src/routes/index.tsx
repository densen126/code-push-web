// 聚合所有模块并创建 router 实例
import UniversalRouter from 'universal-router';
import type { Route } from 'universal-router';
import type { RouContext, RouteRes } from './types';
import { createContext } from './context';
import homeRoutes from './modules/home';
import aboutRoutes from './modules/about';
import usersRoutes from './modules/users';
import dashboardRoutes from './modules/dashboard';
import notFound from './modules/notfound';

const routes: Route<RouteRes, RouContext>[] = [
    {
        path: '',
        // // 全局前置：可做鉴权、日志等
        // async action(ctx) {
        //     // ctx 上下文里有：ctx.pathname, ctx.params, ctx.router, ctx.next 等
        //     return ctx.next!();
        // },
        children: [
            ...homeRoutes,
            ...aboutRoutes,
            ...usersRoutes,
            ...dashboardRoutes,
            ...notFound
        ],
    },
];

const router = new UniversalRouter<RouteRes, RouContext>(routes);

export default router;
