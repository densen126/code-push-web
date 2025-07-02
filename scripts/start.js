const express = require('express');
const handler = require('../dist/server.js');
const { paths: { distPublic, publicPath }, serverHostPort: { local_host, port } } = require('./../config/devconfig.js');

const app = express();
app.use(publicPath, express.static(distPublic));
app.get('/{*splat}', handler);

app.listen(port, () => {
    console.log(`生产模式服务器已启动：http://${local_host}:${port}`);
});
