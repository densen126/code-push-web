import path from 'path';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {
    renderToString,
    renderToStaticMarkup,
    renderToPipeableStream,
} from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import App, { ContextType } from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import routes from './routes';
import assets from './../assets.json';
import configureStore from './store/configureStore';
import { port } from './config';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
if (typeof navigator === 'undefined') {
    (global as any).navigator = { userAgent: 'all' };
} else if (!navigator.userAgent) {
    (navigator as any).userAgent = 'all';
}

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (__DEV__) {
    app.enable('trust proxy');
}

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.use(async (req, res, next) => {
    try {
        const store = configureStore({}, { cookie: req.headers.cookie });

        const css = new Set();

        // Global (context) variables that can be easily accessed from any React component
        // https://facebook.github.io/react/docs/context.html
        const context: ContextType = {
            // Enables critical path CSS rendering
            // https://github.com/kriasoft/isomorphic-style-loader
            insertCss: (...styles: any[]) => {
                const removeCss = styles.map(style => style._insertCss());
                return () => {
                    removeCss.forEach(dispose => dispose());
                };
            },
            // Initialize a new Redux store
            // http://redux.js.org/docs/basics/UsageWithReact.html
            store,
        };

        const router = new UniversalRouter(routes, {context: context});
        const route = await router.resolve({
            pathname: req.path,
            query: req.query,
        });

        if (route.redirect) {
            res.redirect(route.status || 302, route.redirect);
            return;
        }

        const data = { ...route };
        data.children = renderToString(<App context={context}>{route.component}</App>);
        data.styles = [
            { id: 'css', cssText: [...css].join('') },
        ];
        data.scripts = [
            assets.vendor.js,
            assets.client.js,
        ];
        data.state = context.store.getState();
        if (assets[route.chunk]) {
            data.scripts.push(assets[route.chunk].js);
        }

        const stream = renderToPipeableStream(<Html {...data} />, {
            onAllReady() {
                res.status(route.status || 200);
                res.setHeader('Content-Type', 'text/html');
                res.write('<!doctype html>');
                stream.pipe(res);
            },
            onError(err) {
                next(err);
            },
        });
        return;
    } catch (err) {
        next(err);
    }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.log(pe.render(err));
    const html = renderToStaticMarkup(
        <Html
            title="Internal Server Error"
            description={err.message}
            styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}
        >
            {renderToString(<ErrorPageWithoutStyle error={err} />)}
        </Html>
    );
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
});

//
// Export the app so external scripts can start the server
// -----------------------------------------------------------------------------

export default app;

