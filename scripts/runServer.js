import path from 'path';
import cp from 'child_process';
import webpackConfig from './../config/webpack.config';

// Should match the text string used in `src/server.js/server.listen(...)`
const RUNNING_REGEXP = /Dev server listening on http:\/\/(.*?)/;

let server;
let pending = true;
const [, serverConfig] = webpackConfig;
const serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);

// Launch or restart the Node.js server
function runServer() {
  return new Promise((resolve) => {
    function onStdOut(data) {
        console.log("data", data.toString('utf8'), data.toString('utf8').match(RUNNING_REGEXP))
      const time = new Date().toTimeString();
      const match = data.toString('utf8').match(RUNNING_REGEXP);

      process.stdout.write(time.replace(/.*(\d{2}:\d{2}:\d{2}).*/, '[$1] '));
      process.stdout.write(data);

      if (match) {
        server.host = match[1];
        server.stdout.removeListener('data', onStdOut);
        server.stdout.on('data', x => process.stdout.write(x));
        pending = false;
        resolve(server);
      }
    }

    if (server) {
      server.kill('SIGTERM');
    }

    server = cp.spawn('node', './devServer.js', {
      env: Object.assign({ NODE_ENV: 'development' }, process.env),
      silent: false,
    });

    if (pending) {
      server.once('exit', (code, signal) => {
        if (pending) {
          throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
        }
      });
    }

    server.stdout.on('data', onStdOut);
    server.stderr.on('data', x => process.stderr.write(x));

    return server;
  });
}

process.on('exit', () => {
  if (server) {
    server.kill('SIGTERM');
  }
});

export default runServer;