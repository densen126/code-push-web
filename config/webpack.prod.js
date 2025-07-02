const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { WebpackAssetsManifest } = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const {
    commonConfig,
    tsRule,
    clientAssetRules,
    serverIgnoreRules
} = require('./webpack.common.js');
const { paths: { dist, distPublic, publicPath } } = require('./devconfig');

const clientConfig = {
    ...commonConfig,
    name: 'client',
    target: 'web',
    mode: 'production',
    entry: {
        bundle: './src/client.tsx'
    },
    output: {
        path: distPublic,
        filename: 'bundle.[contenthash].js',
        publicPath: publicPath
    },
    module: {
        rules: [
            tsRule,
            ...clientAssetRules
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new WebpackAssetsManifest({
            output: path.join(distPublic, 'assets.json'),
            publicPath: publicPath,
            entrypoints: true
        }),
        new MiniCssExtractPlugin({
            filename: "main.css"
        })
    ]

};

const serverConfig = {
    ...commonConfig,
    name: 'server',
    target: 'node',
    mode: 'production',
    entry: './src/server.tsx',
    externals: [nodeExternals(), /assets\.json$/],
    output: {
        path: dist,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        libraryExport: 'default'
    },
    module: {
        rules: [
            tsRule,
            ...serverIgnoreRules
        ]
    }
};

module.exports = [
    clientConfig,
    serverConfig
];
