import "./styles/tailwind.css";
import path from 'path';
import fs from 'fs';
import { renderToString, renderToPipeableStream } from 'react-dom/server';

import App from './App';
import Html from './Html';
import { Provider } from 'react-redux';
import { createStore } from './store';
import router from './routes';
import { createContext } from './routes/context';
import type { RouContext, RouteRes } from './routes/types';
import { createHistory } from '@/utils/history';


export default async (req: any, res: any, next: any) => {
    try {

        // 每个请求都新建 memoryHistory
        const history = createHistory(req.url);

        // 1. 生成本次请求的上下文
        let ctx: RouContext = createContext(history, req.path);

        // 2. 可选：解析 user、token、locale 等再挂到 ctx 上
        ctx.user = {
            id: "xxx",
            roles: ["lark"]
        };

        // 3. 路由匹配，获得渲染数据
        let routeResult = await router.resolve(ctx);

        // 处理跳转逻辑（如果 history.location 变化了，重新 resolve）
        if (routeResult === null && history.location.pathname !== req.url) {
            ctx = createContext(history, history.location.pathname);
            routeResult = await router.resolve(ctx);
        }

        // 4. 用 initialData 创建 Redux store
        const store = createStore(routeResult?.initialData);

        const preloadedState = store.getState();
        const data = {
            title: routeResult?.title,
            user: ctx.user,
            preloadedState: preloadedState,
            message: '这是从服务端渲染的消息…'
        };

        // 5. 读取 assets.json 注入前端脚本
        let scripts = ['/public/bundle.js'];
        if (process.env.NODE_ENV === 'production') {
            const manifestPath = path.resolve(__dirname, './public/assets.json');
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
            scripts = manifest.entrypoints.bundle.assets.js;
        }

        // 6. 输出完整 HTML
        let didError = false;

        const { pipe } = renderToPipeableStream(
            <Html
                data={data}
                scripts={scripts}
                content={
                    <Provider store={store}>
                        <App component={routeResult?.component} />
                    </Provider>
                }
            />,
            {
                onShellReady() {
                    res.statusCode = didError ? 500 : 200;
                    res.setHeader('Content-type', 'text/html');
                    pipe(res); // 开始流式输出
                },
                onError(err) {
                    didError = true;
                    // 可自定义错误处理
                    console.error('SSR Error:', err);
                },
            }
        );

        // 防止永远不结束
        setTimeout(() => {
            if (!res.headersSent) res.end();
        }, 15000);
    } catch (error) {
        next(error);
    }
};
