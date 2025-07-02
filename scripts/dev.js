// scripts/dev.js
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const { serverHostPort: { local_host, port } } = require('./../config/devconfig.js');

// 载入开发环境下的 client 与 server 配置
const [clientConfig, serverConfig] = require('./../config/webpack.dev.js');

const app = express();

// Client HMR
const clientCompiler = webpack(clientConfig);
app.use(
    devMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: 'minimal',
        writeToDisk: true
    })
);
app.use(hotMiddleware(clientCompiler));

// Server 编译与热重载
const serverCompiler = webpack(serverConfig);
let serverBundle;
serverCompiler.watch({}, (err, stats) => {
    if (err) {
        console.error('Webpack fatal error:', err);
        return;
    }
    // 打印编译状态
    console.log(stats.toString({
        colors: true,
        warnings: true,
        errors: true,
        modules: false
    }));
    // 如果有编译错误，先别 require
    if (stats.hasErrors()) {
        console.error('Server bundle build failed, see errors above.');
        return;
    }

    const serverPath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );
    console.log('✅ Server bundle output to:', serverPath);

    // 清缓存并加载
    delete require.cache[require.resolve(serverPath)];
    serverBundle = require(serverPath);
});


// 中间件：所有请求都走 serverBundle
app.use((req, res, next) => {
    if (!serverBundle) {
        res.status(503).send('正在编译服务器端代码…');
    } else {
        serverBundle(req, res, next);
    }
});

app.listen(port, () => {
    console.log(`开发服务器启动：http://${local_host}:${port}`);
});
