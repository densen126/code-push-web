const { merge: mergeProd } = require('webpack-merge');
const commonProd = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// 客户端生产配置
const clientProdConfig = mergeProd(commonProd, {
    name: 'client',
    target: 'web',
    mode: 'production',
    entry: path.resolve(__dirname, 'src/client.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/',
        filename: 'static/js/[name].[contenthash:8].js',
        clean: true
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BROWSER': JSON.stringify(true),
            __DEV__: JSON.stringify(false)
        }),
        new MiniCssExtractPlugin({ filename: 'static/css/[name].[contenthash:8].css' }),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css)$/, 
            threshold: 10240,
            minRatio: 0.8
        }),
        new WebpackManifestPlugin({ fileName: 'manifest.json' })
    ],
    optimization: {
        splitChunks: { chunks: 'all', name: false },
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            new TerserPlugin({ terserOptions: { compress: { drop_console: true } } })
        ]
    }
});

// 服务端生产配置
const serverProdConfig = mergeProd(commonProd, {
    name: 'server',
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, 'src/server.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        clean: true
    },
    devtool: 'source-map',
    externals: [nodeExternals()],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BROWSER': JSON.stringify(false),
            __DEV__: JSON.stringify(false)
        }),
        new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true })
    ]
});

module.exports = [clientProdConfig, serverProdConfig];