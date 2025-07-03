import type { RouteContext } from 'universal-router';
import type { RouteRes, RouContext } from './types';

/**
 * 鉴权：若 ctx.user 不存在，就跳到 /login
 * 返回值要么是重定向对象，要么是下一个 RouteRes
 */
// export async function requireAuth(
//     ctx: RouteContext<RouteRes, RouContext>
// ): Promise<RouteRes | { redirect: string }> {
//     if (!ctx.user) {
//         return { title: '跳转', component: <Redirect to="/login" /> };
//     }
//     return null;
// }

export function requireLogin(ctx: RouteContext): RouteRes | boolean | null {
    if (!ctx.user) {
        ctx.history.replace('/login');
        return true;
        // return {
        //     title: '请登录',
        //     component: <Login />,
        // };
    }
    return false;
}
