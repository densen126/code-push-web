// 聚合所有模块并创建 router 实例
import UniversalRouter from 'universal-router';
import type { Route } from 'universal-router';
import type { RouContext, RouteRes } from './types';
import { createContext } from './context';
import home from './modules/home';
import about from './modules/about';
import users from './modules/users';
import dashboard from './modules/dashboard';
import login from './modules/login';
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
            ...login,
            ...home,
            ...about,
            ...users,
            ...dashboard,
            ...notFound
        ],
    },
];

const router = new UniversalRouter<RouteRes, RouContext>(routes);

export default router;

