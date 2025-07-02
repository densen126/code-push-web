const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { paths: { dist, distPublic, publicPath } } = require('./devconfig');

const {
    commonConfig,
    tsRule,
    clientAssetRules,
    serverIgnoreRules
} = require('./webpack.common.js');

const clientConfig = {
    ...commonConfig,
    name: 'client',
    target: 'web',
    mode: 'development',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './src/client.tsx'
    ],
    output: {
        path: distPublic,
        filename: 'bundle.js',
        publicPath: publicPath
    },
    module: {
        rules: [
            // 在 tsRule 的基础上注入 react-refresh
            {
                ...tsRule,
                use: {
                    ...tsRule.use,
                    options: {
                        ...tsRule.use.options,
                        plugins: [
                            ...tsRule.use.options.plugins,
                            'react-refresh/babel'
                        ]
                    }
                }
            },
            ...clientAssetRules
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin()
    ],
    devtool: 'cheap-module-source-map'
};

const serverConfig = {
    ...commonConfig,
    name: 'server',
    target: 'node',
    mode: 'development',
    entry: './src/server.tsx',
    externals: [nodeExternals()],
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

module.exports = [clientConfig, serverConfig];
