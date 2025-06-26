const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// 客户端开发配置
const clientDevConfig = merge(common, {
    name: 'client',
    target: 'web',
    mode: 'development',
    entry: path.resolve(__dirname, 'src/client.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/',
        filename: 'static/js/[name].js',
        clean: true
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.BROWSER': JSON.stringify(true),
            __DEV__: JSON.stringify(true)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ]
});

// 服务端开发配置
const serverDevConfig = merge(common, {
    name: 'server',
    target: 'node',
    mode: 'development',
    entry: path.resolve(__dirname, 'src/server.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        clean: true
    },
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.BROWSER': JSON.stringify(false),
            __DEV__: JSON.stringify(true)
        }),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true
        })
    ]
});

module.exports = [clientDevConfig, serverDevConfig];