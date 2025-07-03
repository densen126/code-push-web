// 聚合所有模块并创建 router 实例
import UniversalRouter from 'universal-router';
import type { Route } from 'universal-router';
import type { RouContext, RouteRes } from './types';
import { createContext } from './context';
import login from './modules/login';
import register from './modules/register';
import userSetting from './modules/userSetting';
import apps from './modules/apps';
import accessKeys from './modules/accessKeys';
import document from './modules/document';
import notFound from './modules/notFound';

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
            ...register,
            ...userSetting,
            ...apps,
            ...accessKeys,
            ...document,
            ...notFound
        ],
    },
];

const router = new UniversalRouter<RouteRes, RouContext>(routes);

export default router;

