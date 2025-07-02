const express = require('express');
const handler = require('../dist/server.js');
const { paths: { distPublic, publicPath } } = require('./../config/config.js');

const app = express();
app.use(publicPath, express.static(distPublic));
app.get('/{*splat}', handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`生产模式服务器已启动：http://localhost:${PORT}`);
});
