const path = require('path');

module.exports = {
    // 持久化缓存，加速二次构建
    cache: {
        type: 'filesystem',
        buildDependencies: { config: [__filename] }
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
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
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/media/[name].[hash:8][ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[name].[hash:8][ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
        alias: { '@': path.resolve(__dirname, 'src') }
    }
};