const path = require('path');
const { paths: { projectRoot, src } } = require('./devconfig');
const pkg = require(path.resolve(projectRoot, 'package.json'));
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



/// 1. 导出「合法」的公共 Webpack 配置
exports.commonConfig = {
    context: projectRoot,
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [
                path.resolve(projectRoot, 'config/webpack.common.js'),
                path.resolve(projectRoot, 'config/webpack.dev.js'),
                path.resolve(projectRoot, 'config/webpack.prod.js')
            ]
        }
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
        alias: { '@': src }
    }
};

/// 2. 导出可复用的 rule 定义（**不要**放到 commonConfig 里）
exports.tsRule = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: pkg.engines.node.replace(/^[^\d]+/, ''),
                            browsers: pkg.browserslist
                        },
                        modules: false
                    }
                ],
                ['@babel/preset-react', { runtime: 'automatic' }],
                '@babel/preset-typescript'
            ],
            plugins: [
                ['module-resolver', {
                    root: ['./src'],
                    alias: { '@': './src' }
                }]
            ]
        }
    }
};

exports.clientAssetRules = [
    {
        test: /\.css$/,
        use: [
            process.env.NODE_ENV === "production"
                ? MiniCssExtractPlugin.loader
                : "style-loader",
            'css-loader',
            'postcss-loader'
        ],
    },
    {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: { filename: 'static/media/[name].[hash:8][ext]' }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: { filename: 'static/fonts/[name].[hash:8][ext]' }
    }
];

exports.serverIgnoreRules = [
    { test: /\.css$/, loader: 'null-loader' },
    {
        test: /\.(png|jpe?g|gif|svg|ico|woff2?|eot|ttf|otf)$/,
        loader: 'null-loader'
    }
];
