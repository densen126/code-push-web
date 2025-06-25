import path from 'path';
import webpackConfig from './../config/webpack.config.js';
import { local_host, port } from './../config/config.js';
import run from './run.js';

const [, serverConfig] = webpackConfig;
const serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);

async function start() {
    const { default: app } = await import(serverPath);
    await new Promise((resolve) => {
        app.listen(port, () => {
            console.log(`Server listening on http://${local_host}:${port}`);
            resolve();
        });
    });
}

export default start;

if (require.main === module) {
    run(start).catch((err) => {
        console.error(err);
        process.exit(1);
    });
}

// 为什么直接启动 express 会报错无法引入模块，找不到模块
// 改用函数却没问题了
