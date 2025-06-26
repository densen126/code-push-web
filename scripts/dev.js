const path = require('path');
const express = require('express');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { merge } = require('webpack-merge');

// 加载客户端和公共配置
const clientConfig = require('./../config/webpack.dev.js');
const commonConfig = require('./../config/webpack.common.js');

// 动态构建服务端开发配置
const serverConfig = merge(commonConfig, {
    mode: 'development',
    target: 'node',
    entry: path.resolve(__dirname, '../src/server.tsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'inline-source-map',
    externals: [nodeExternals()]
});

// 编译并监听服务端代码
const serverCompiler = webpack(serverConfig);
let serverRender;
const serverBundlePath = path.resolve(__dirname, '../dist/server.js');
serverCompiler.watch({}, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    if (stats.hasErrors()) {
        console.error(stats.toString({ colors: true, errors: true }));
        return;
    }
    // 热重载服务端渲染函数
    delete require.cache[serverBundlePath];
    serverRender = require(serverBundlePath).default || require(serverBundlePath);
    console.log('Server bundle rebuilt');
});

// 创建 Express 实例
const app = express();
// 客户端 HMR
const clientCompiler = webpack(clientConfig);
app.use(
    webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: 'minimal'
    })
);
app.use(webpackHotMiddleware(clientCompiler));

// 静态资源
app.use(express.static(path.resolve(__dirname, '../public')));

// SSR 处理
app.get('*', (req, res, next) => {
    if (!serverRender) {
        return res.send('Compiling server... Please refresh shortly.');
    }
    serverRender(req, res, next);
});

// 启动服务
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}`);
});