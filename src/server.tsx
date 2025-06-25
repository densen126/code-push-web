import path from 'path';
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import App from './components/App';
import Html from './components/Html';
import routes from 'routes';

const app = express();

// Serve static assets from the build output directory
app.use('/assets', express.static(path.resolve(__dirname)));

app.get('/', (req, res) => {
    const currentPath = req.path;
    const content = ReactDOMServer.renderToString(<App currentPath={currentPath} />);
    const html = ReactDOMServer.renderToStaticMarkup(
        // <Html>
        //   <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        // </Html>
        <Html title={'Untitled'} currentPath={currentPath}>
            {content}
        </Html>
    );
    res.send('<!doctype html>' + html);
});

export default app;
