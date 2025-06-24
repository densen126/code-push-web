import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import pkg from './../package.json';

const isDebug = !process.argv.includes('--release');
const isAnalyse = process.argv.includes('--analyse') || process.argv.includes('--analyze');
const analyzerPort = 3003;
const rootdir = path.resolve(__dirname, '../src');

const common = {
    context: rootdir,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [rootdir, 'node_modules'],
    },
    output: {
        path: path.resolve(__dirname, '../build/public/assets'),
        publicPath: '/assets/',
        pathinfo: isVerbose,
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: isDebug,
                        babelrc: false,
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    node: parseFloat(pkg.engines.node.replace(/^[^\d]+/, '')),
                                    browsers: pkg.browserslist,
                                },
                                modules: false,
                                useBuiltIns: 'entry',
                                corejs: 3,
                            }],
                            ['@babel/preset-react', { development: isDebug, runtime: 'automatic' }],
                            '@babel/preset-typescript',
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: { auto: true, localIdentName: '[name]-[local]-[hash:base64:5]' },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: './postcss.config.js',
                        },
                    }
                ],
            },
            { test: /\.md$/, loader: path.resolve(__dirname, './../lib/markdown-loader.js') },
            { test: /\.txt$/, loader: 'raw-loader' },
            {
                test: /\.(ico|jpg|jpeg|png|gif|webp|svg|eot|otf|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: { filename: '[path][name][ext]?[hash:8]' },
            },
            {
                test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/i,
                type: 'asset',
                parser: { dataUrlCondition: { maxSize: 10 * 1024 } },
                generator: { filename: '[path][name][ext]?[hash:8]' },
            },
        ],
    },
    bail: !isDebug,
    cache: isDebug,
    stats: {
        colors: true,
        reasons: isDebug,
        hash: isVerbose,
        version: isVerbose,
        timings: true,
        chunks: isVerbose,
        chunkModules: isVerbose,
        cached: isVerbose,
        cachedAssets: isVerbose,
    },
};

const clientConfig = merge(common, {
    name: 'client',
    mode: isDebug ? 'development' : 'production',
    target: 'web',
    entry: path.resolve('src/client.tsx'),
    output: {
        ...config.output,
        filename: isDebug ? 'main.js' : 'main.[contenthash:8].js',
        chunkFilename: isDebug ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isDebug ? 'development' : 'production'),
            'process.env.BROWSER': true,
            __DEV__: isDebug,
        }),
        new AssetsPlugin({
            path: path.resolve('build'),
            filename: 'assets.json',
            prettyPrint: true,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: isAnalyse ? 'server' : (isDebug ? 'disabled' : 'static'),
            analyzerHost: '127.0.0.1',
            analyzerPort,
            reportFilename: path.resolve('report.html'),
            openAnalyzer: true,
            generateStatsFile: !isDebug,
            statsFilename: path.resolve('stats.json'),
        }),
    ],
    devtool: isDebug ? 'cheap-module-source-map' : false,
});

const serverConfig = merge(common, {
    name: 'server',
    mode: isDebug ? 'development' : 'production',
    target: 'node',
    entry: path.resolve('src/server.tsx'),
    output: {
        ...config.output,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    externals: [
        nodeExternals(),
        /^\.\/assets\.json$/,
        (context, request, callback) => {
            const isExternal = request.match(/^[@a-z][a-z/\.\-0-9]*$/i) && !request.match(/\.(css|less|scss|sss)$/i);
            callback(null, Boolean(isExternal));
        },
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(isDebug ? 'development' : 'production'),
            'process.env.BROWSER': false,
            __DEV__: isDebug,
        }),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
    ],
    devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
});

export default [clientConfig, serverConfig];
