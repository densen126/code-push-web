import { createBrowserHistory, createMemoryHistory } from 'history';

export function createHistory(url?: string) {
    if (typeof window !== 'undefined') {
        // 浏览器端
        return createBrowserHistory();
    } else {
        // 服务端 SSR，初始 entry 为当前请求的 url
        return createMemoryHistory({ initialEntries: [url || '/'] });
    }
}
