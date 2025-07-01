import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import pkg from './../package.json';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyse = process.argv.includes('--analyse') || process.argv.includes('--analyze');
const port = parseInt(process.env.PORT || '3000', 10);
const analyzerPort = port + 3;
const rootdir = path.resolve(__dirname, '../src');


const common = {
    context: rootdir,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [rootdir, 'node_modules'],
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
                            ['@babel/preset-react', {
                                development: isDebug,
                                runtime: 'automatic',
                            }],
                            '@babel/preset-typescript',
                        ]
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
                            modules: {
                                auto: true,
                                localIdentName: '[name]-[local]-[hash:base64:5]'
                            }
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.md$/,
                loader: path.resolve('tools/lib/markdown-loader.js'),
            },
            {
                test: /\.txt$/,
                loader: 'raw-loader',
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|webp|svg|eot|otf|ttf|woff|woff2)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[path][name][ext]?[hash:8]',
                },
            },
            {
                test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 10kb
                    },
                },
                generator: {
                    filename: '[path][name][ext]?[hash:8]',
                },
            },
        ],
    },
};

const clientConfig = merge(common, {
    name: 'client',
    mode: isDebug ? 'development' : 'production',
    target: 'web',
    entry: path.resolve('src/client.tsx'),
    output: {
        path: path.resolve('build/public'),
        filename: 'main.js',
        publicPath: '/public/',
    },
    output: {
        path: path.resolve('build/public/assets'),
        publicPath: '/assets/',
        filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
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
            analyzerMode: isAnalyse ? 'server' : isDebug ? 'disabled' : 'static',
            analyzerHost: '127.0.0.1',
            analyzerPort: 3003,
            reportFilename: path.resolve('report.html'),
            openAnalyzer: true,
            generateStatsFile: !isDebug,
            statsFilename: path.resolve('stats.json'),
            logLevel: 'info',
        }),
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    devtool: isDebug ? 'cheap-module-source-map' : false,
});

const serverConfig = merge(common, {
    name: 'server',
    mode: isDebug ? 'development' : 'production',
    target: 'node',
    entry: path.resolve('src/server.tsx'),
    output: {
        path: path.resolve('build'),
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    externals: [
        nodeExternals(),
        /^\.\/assets\.json$/,
        (context, request, callback) => {
            const isExternal =
                request.match(/^[@a-z][a-z/\.\-0-9]*$/i) &&
                !request.match(/\.(css|less|scss|sss)$/i);
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

function createBabelLoaderOptions({ isClient }) {
    return {
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
            ['@babel/preset-react', {
                development: isDebug,
                runtime: 'automatic',
            }],
            '@babel/preset-typescript',
        ],
    };
}

// const clientConfig = {
//   name: 'client',
//   mode: 'development',
//   target: 'web',
//   entry: path.resolve('src/client.tsx'),
//   output: {
//     path: path.resolve('build/public'),
//     filename: 'main.js',
//     publicPath: '/public/',
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.[jt]sx?$/,
//         use: 'babel-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   devtool: 'cheap-module-source-map',
// };

// const serverConfig = {
//   name: 'server',
//   mode: 'development',
//   target: 'node',
//   entry: path.resolve('src/server.tsx'),
//   output: {
//     path: path.resolve('build'),
//     filename: 'server.js',
//     libraryTarget: 'commonjs2',
//   },
//   externals: [nodeExternals()],
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js'],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.[jt]sx?$/,
//         use: 'babel-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   devtool: 'cheap-module-source-map',
// };


export default [clientConfig, serverConfig];



function getCommonRules({ isClient }) {
    return [

    ];
}

function createCommonConfig() {
    return {
        mode: isDebug ? 'development' : 'production',
        context: rootdir,
        output: {
            path: path.resolve(__dirname, '../build/public/assets'),
            publicPath: '/assets/',
            pathinfo: isVerbose,
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            modules: [rootdir, 'node_modules'],
        },
        bail: !isDebug,
        cache: isDebug ? {
            type: 'filesystem',
            buildDependencies: {
                config: [__filename],
            },
            cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack'),
            version: '1.0',
        } : false,
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
}

const clientConfig1 = {
    ...createCommonConfig(),
    name: 'client',
    target: 'web',
    entry: 'client',
    module: { rules: getCommonRules({ isClient: true }) },
    output: {
        ...createCommonConfig().output,
        filename: isDebug ? '[name].js' : '[name].[contenthash:8].js',
        chunkFilename: isDebug ? '[name].chunk.js' : '[name].[contenthash:8].chunk.js',
    },
    devServer: {
        devMiddleware: {
            writeToDisk: isDebug,
        },
    },
    // optimization: isDebug ? {
    //     minimize: false,
    //     splitChunks: false,
    //     runtimeChunk: false,
    // } : {
    //     splitChunks: {
    //         chunks: 'all',
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendor',
    //                 chunks: 'all',
    //                 priority: -10,
    //             },
    //             default: {
    //                 minChunks: 2,
    //                 priority: -20,
    //                 reuseExistingChunk: true,
    //             },
    //         },
    //     },
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin({
    //             terserOptions: {
    //                 compress: {
    //                     drop_console: true,
    //                 },
    //                 output: {
    //                     comments: false,
    //                 },
    //             },
    //             extractComments: false,
    //         }),
    //     ],
    // },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.BROWSER': true, __DEV__: isDebug }),
        new AssetsPlugin({
            path: path.resolve(__dirname, '../build'),
            filename: 'assets.json',
            prettyPrint: true,
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: isAnalyse ? 'server' : (!isDebug ? 'static' : 'disabled'),
            analyzerHost: '127.0.0.1',
            analyzerPort,
            reportFilename: path.resolve(__dirname, '../report.html'),
            openAnalyzer: true,
            generateStatsFile: !isDebug,
            statsFilename: path.resolve(__dirname, '../stats.json'),
        }),
    ],
    devtool: isDebug ? 'cheap-module-source-map' : false,
};

const serverConfig2 = {
    ...createCommonConfig(),
    name: 'server',
    target: 'node',
    entry: 'server',
    module: { rules: getCommonRules({ isClient: true }) },
    output: {
        ...createCommonConfig().output,
        filename: 'server.js',
        libraryTarget: 'commonjs2',
    },
    externals: [
        nodeExternals(),
        /^\.\/assets\.json$/,
    ],
    plugins: [
        new webpack.DefinePlugin({ 'process.env.BROWSER': false, __DEV__: isDebug }),
        new webpack.BannerPlugin({
            banner: 'require("source-map-support").install();',
            raw: true,
            entryOnly: false,
        }),
    ],
    devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
};
