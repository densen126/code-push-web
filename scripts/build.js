import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../config/webpack.config.js';
import run from './run.js';

async function build() {
    fs.rmSync(path.resolve('build'), { recursive: true, force: true });

    const compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(stats.toString(webpackConfig[0].stats));
            compiler.close((closeErr) => {
                if (closeErr) {
                    reject(closeErr);
                    return;
                }
                const srcFile = path.resolve('build/assets.json');
                const destFile = path.resolve('build/public/assets/assets.json');
                if (fs.existsSync(srcFile)) {
                    fs.copyFileSync(srcFile, destFile);
                }
                resolve();
            });
        });
    });
}

export default build;

if (require.main === module) {
    run(build).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}
