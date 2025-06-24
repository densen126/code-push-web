// start.js
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { spawn } from 'child_process';
import fs from "fs"

import { readdirSync } from 'fs';
import { pathToFileURL } from 'url';
import http from 'http';


import webpackConfig from './../config/webpack.config.js';

let server;
const [clientConfig, serverConfig] = webpackConfig;

clientConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=3000',
    ...[].concat(clientConfig.entry).filter(Boolean),
];

const babelRule = clientConfig.module.rules.find(
    (rule) => rule.loader === 'babel-loader'
);

if (babelRule) {
    babelRule.options = babelRule.options || {};
    babelRule.options.plugins = [
        'react-refresh/babel',
        ...(babelRule.options.plugins || []),
    ];
}

// 添加 HMR 插件
clientConfig.plugins = []
clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
clientConfig.plugins.push(new ReactRefreshWebpackPlugin({ overlay: false }));

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);

async function createApp() {
    const app = express();

    // app.use('/assets', express.static(path.resolve(__dirname, '../build/public/assets')));
    app.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            // writeToDisk: filePath => {
            //     // 只写入 server 构建结果（例如 server.js）
            //     return /server\.js$/.test(filePath);
            // },
            // stats: clientConfig.stats
        })
    );
    app.use(webpackHotMiddleware(clientCompiler));

    const mod = await import("./../build/server.js");
    let ssrApp = mod.default || mod;

    app.use((req, res, next) => {
        if (ssrApp) return ssrApp.handle(req, res, next);
        return res.status(503).send('Server is starting...');
    });

    return app;
}

async function restartServer() {
  console.log('[server] 🔁 Restarting...');

  if (server) {
    server.close(async () => {
      console.log('[server] Closed old server');
      await startServer(); // 关闭旧的后再重启
    });
  } else {
    await startServer(); // 第一次启动
  }
}

async function startServer() {
  const app = await createApp();
  server = app.listen(3000, () => {
    console.log('[server] Listening on port 3000');
  });
}


let isServerStarted = false;

// 监听构建完成后自动重启 Node 服务
serverCompiler.hooks.done.tap('RestartServerPlugin', async () => {
    if (isServerStarted) {
        await restartServer();
    } else {
        await startServer();
    }
});

// 启动 watch 模式，监听文件变化
serverCompiler.watch({}, (err) => {
    if (err) {
        console.error('[server] 编译失败:', err);
    }
});
