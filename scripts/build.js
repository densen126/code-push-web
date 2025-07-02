// scripts/build.js
// 生产模式：一次性构建 client+server，输出到 dist/
require('child_process').execSync(
    'npx webpack --config webpack.config.js --mode production',
    { stdio: 'inherit' }
);
