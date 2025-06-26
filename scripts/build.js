const path = require('path');
const webpack = require('webpack');

// 生产配置支持数组：clientConfig + serverConfig
const configs = require('./../config/webpack.prod.js');

const compiler = webpack(configs);
compiler.run((err, stats) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(
        stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        })
    );
    if (stats.hasErrors()) {
        console.error('Build failed with errors');
        process.exit(1);
    }
    console.log('Build completed successfully');
});