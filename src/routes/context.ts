// 路由上下文类型 & 公共扩展
import type { RouContext } from './types';

/** 每次 SSR 时根据请求生成一个上下文 */
export function createContext(pathname: string): RouContext {
    return {
        pathname,
        params: {},
        // user: 从 cookie / session 里解析后赋值
    };
}
