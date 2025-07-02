// 路由上下文类型 & 公共扩展
import type { RouContext } from './types';

/** 每次 SSR 时根据请求生成一个上下文 */
export function createContext(history: import('history').History, pathname: string): RouContext {
    return {
        history,
        pathname,
        params: {},
        // user: 从 cookie / session 里解析后赋值
    };
}
