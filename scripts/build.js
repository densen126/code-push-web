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
        if (closeErr) reject(closeErr);
        else resolve();
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