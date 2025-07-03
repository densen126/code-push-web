import "./styles/tailwind.css";
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from './store';
import App from './App';
import router from './routes';
import type { RouContext, RouteRes } from './routes/types';
import { createHistory } from '@/utils/history';

let ctx: RouContext;
const history = createHistory();

// 1. 取出 SSR 注入的初始数据
const data = (window as any).__INITIAL_STATE__;
delete (window as any).__INITIAL_STATE__;

// 2. 初始化 Redux store
const store = createStore(data.preloadedState);

function render(routeResult: any) {
    hydrateRoot(
        document.getElementById('root')!,
        <Provider store={store}>
            <App component={routeResult?.component} />
        </Provider>
    );
}

// 监听 history 路径变化，实现客户端路由无刷跳转
history.listen(async ({ location }) => {
    ctx = {
        history: history,
        pathname: location.pathname,
        user: data.user,
        params: {}, // 如有需要，可以传递 user/token 等
    };
    const routeResult = await router.resolve(ctx);
    render(routeResult);
});

(async () => {
    // 3. 构造客户端上下文
    ctx = {
        history: history,
        pathname: history.location.pathname,
        user: data.user,
        params: {},       // 通常你可以客户端用 window.location 或 URLSearchParams 解析参数
        // 这里 user 一般前端不需要初始化
    };

    // 4. 路由解析（客户端 hydrate 只需当前页面，不用全局路由跳转）
    const routeResult = await router.resolve(ctx);

    render(routeResult)
})();
