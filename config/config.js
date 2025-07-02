const path = require('path');
const projectRoot = process.cwd();

exports.paths = {
    projectRoot,
    src: path.resolve(projectRoot, 'src'),
    dist: path.resolve(projectRoot, 'dist'),
    distPublic: path.resolve(projectRoot, 'dist/public'),
    publicPath: '/public/'
};


exports.serverconfig = {
    local_host: "localhost",
    port: 3000
}
