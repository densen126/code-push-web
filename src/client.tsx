import "./styles/tailwind.css";
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from './store';
import App from './App';
import router from './routes';
import type { RouContext, RouteRes } from './routes/types';

// 1. 取出 SSR 注入的初始数据
const data = (window as any).__INITIAL_STATE__;
delete (window as any).__INITIAL_STATE__;

// 2. 初始化 Redux store
const store = createStore(data.spreloadedState);

// 3. 构造客户端上下文
const ctx: RouContext = {
    pathname: window.location.pathname,
    user: data.user,
    params: {},       // 通常你可以客户端用 window.location 或 URLSearchParams 解析参数
    // 这里 user 一般前端不需要初始化
};

(async () => {
    // 4. 路由解析（客户端 hydrate 只需当前页面，不用全局路由跳转）
    const routeResult = await router.resolve(ctx);

    hydrateRoot(
        document.getElementById('root')!,
        <Provider store={store}>
            <App component={routeResult?.component} />
        </Provider>
    );
})();
