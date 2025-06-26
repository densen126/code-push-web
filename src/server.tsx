// src/server.tsx
import express from 'express';
import path from 'path';
import fs from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './components/App';
import Html from './components/Html';
import { createStore } from './store';
import { router } from './router';

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const staticDir = path.resolve(__dirname, isProd ? 'public' : '../public');

// 服务端渲染时暴露静态资源
app.use(express.static(staticDir));

app.get('*', async (req, res) => {
    try {
        // 1. 创建 Redux store
        const store = createStore();

        // 2. 路由匹配
        const context = await router.resolve({ pathname: req.path });

        // 3. 渲染 App
        const appHtml = renderToString(
            <Provider store={store}>
                <App context={context} />
            </Provider>
        );

        // 4. 拿到初始 state
        const preloadedState = store.getState();

        // 5. 确定要注入的脚本和样式
        let scripts: string[] = [];
        let styles: string[] = [];

        if (isProd) {
            const mfPath = path.resolve(staticDir, 'manifest.json');
            const manifest = JSON.parse(fs.readFileSync(mfPath, 'utf-8'));
            for (const key in manifest) {
                const asset = manifest[key];
                if (key.endsWith('.js')) scripts.push('/' + asset);
                if (key.endsWith('.css')) styles.push('/' + asset);
            }
        } else {
            // 开发模式下输出 main.js
            scripts.push('/static/js/main.js');
        }

        // 6. 装入 Html 模板
        const html = '<!DOCTYPE html>' +
            renderToString(
                <Html
                    title={context.title}
                    state={preloadedState}
                    routeContext={context}
                    scripts={scripts}
                    styles={styles}
                >
                    <div id="root" dangerouslySetInnerHTML={{ __html: appHtml }} />
                </Html>
            );

        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send('服务器内部错误');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
