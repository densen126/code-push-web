// start.js
import open from 'open';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpackConfig from './../config/webpack.config.js';
import { local_host, port } from './../config/config.js'

let server;
const [clientConfig, serverConfig] = webpackConfig;
const serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);

clientConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=3000',
    ...[].concat(clientConfig.entry).filter(Boolean),
];

const babelRule = clientConfig.module.rules.find(
    (rule) => rule.loader === 'babel-loader'
);

console.log(serverPath)

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

    const mod = await import(serverPath);
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
  server = app.listen(port, () => {
    console.log(`[server] Listening on port ${port}`);
  });
}


let isServerStarted = false;

// 监听构建完成后自动重启 Node 服务
serverCompiler.hooks.done.tap('RestartServerPlugin', async () => {
    if (isServerStarted) {
        await restartServer();
    } else {
        await startServer();
        await open(`http://${local_host}:${port}`);
    }
});

// 启动 watch 模式，监听文件变化
serverCompiler.watch({}, (err) => {
    if (err) {
        console.error('[server] 编译失败:', err);
    }
});
