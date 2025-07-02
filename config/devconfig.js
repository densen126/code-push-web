const path = require('path');
const projectRoot = process.cwd();

exports.paths = {
    projectRoot,
    src: path.resolve(projectRoot, 'src'),
    dist: path.resolve(projectRoot, 'dist'),
    distPublic: path.resolve(projectRoot, 'dist/public'),
    publicPath: '/public/'
};


exports.serverHostPort = {
    local_host: process.env.WEBSITE_HOSTNAME || "localhost",
    port: process.env.PORT || 3001
}

