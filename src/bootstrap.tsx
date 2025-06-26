// src/bootstrap.ts
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import App from './components/App';
import Html from './components/Html';
import { createStore } from './store';
import { router } from './router';

export async function renderAppServer(url: string) {
    // 1. 创建 store
    const store = createStore();

    // 2. 路由匹配
    const routeContext = await router.resolve({ pathname: url });

    // 3. 渲染 App 为 HTML
    const appHtml = renderToString(
        <Provider store={store}>
            <App context={routeContext} />
        </Provider>
    );

    // 4. 获取初始状态
    const preloadedState = store.getState();

    // 5. 用 Html 模板包裹
    const html = renderToString(
        <Html
            title={routeContext.title}
            state={preloadedState}
            routeContext={routeContext}
        >
            <div id="root" dangerouslySetInnerHTML={{ __html: appHtml }} />
        </Html>
    );

    return { html, preloadedState, routeContext };
}
