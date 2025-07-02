import "./styles/tailwind.css";
import path from 'path';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import App from './App';
import Html from './Html';
import { Provider } from 'react-redux';
import { createStore } from './store';
import router from './routes';
import { createContext } from './routes/context';
import type { RouContext, RouteRes } from './routes/types';


export default async (req: any, res: any, next: any) => {
    try {
        // 1. 生成本次请求的上下文
        const ctx: RouContext = createContext(req.path);

        // 2. 可选：解析 user、token、locale 等再挂到 ctx 上
        ctx.user = {
            id: "xxx",
            roles: ["lark"]
        };

        // 3. 路由匹配，获得渲染数据
        const routeResult = await router.resolve(ctx);

        // 4. 用 initialData 创建 Redux store
        const store = createStore(routeResult?.initialData);
        
        const preloadedState = store.getState();
        const data = {
            title: routeResult?.title,
            user: ctx.user,
            preloadedState: preloadedState,
            message: '这是从服务端渲染的消息…'
        };
        
        const appHtml = renderToString(
            <Provider store={store}>
                <App component={routeResult?.component} />
            </Provider>
        );

        // 5. 读取 assets.json 注入前端脚本
        let scripts = ['/public/bundle.js'];
        if (process.env.NODE_ENV === 'production') {
            const manifestPath = path.resolve(__dirname, './public/assets.json');
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
            scripts = manifest.entrypoints.bundle.assets.js;
        }

        // 6. 输出完整 HTML
        const fullHtml = renderToString(<Html content={appHtml} data={data} scripts={scripts} />);
        res.send(`<!DOCTYPE html>${fullHtml}`);
    } catch (error) {
        next(error);
    }
};
