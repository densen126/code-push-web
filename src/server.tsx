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


// import express from 'express';
// import React from 'react';
// import ReactDOMServer from 'react-dom/server';

// import App from 'components/App';
// import Html from 'components/Html';
// import routes from 'routes';

// import { local_host, server_port } from './../config/config';

// const app = express();

// // 静态资源目录
// // app.use(express.static(path.resolve(__dirname, 'public')));

// app.get('/', async (req, res) => {
//     try {
//         // 根据路径找对应路由，没有则用 NotFound
//         const route = routes.find(r => r.path === req.path) || routes.find(r => r.path === '*');

//         // 渲染对应组件内容
//         // const content = ReactDOMServer.renderToString(
//         //     <App>
//         //         {route?.component ? React.createElement(route.component) : null}
//         //     </App>
//         // );

//         const html = ReactDOMServer.renderToStaticMarkup(
//             <Html title={route?.title || 'Untitled'}>
//                 <App>
//                     {route?.component ? React.createElement(route.component) : null}
//                 </App>
//             </Html>
//         );


//         // 流式渲染 React 组件，逐步向客户端发送 HTML
//         // ReactDOMServer.renderToPipeableStream
//         console.log(`${html}`)
//         res.status(route?.status || 200).send(`${html}`);
//     } catch (error) {
//         console.error('SSR error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.listen(server_port, () => {
//     console.log(`Dev server listening on http://${local_host}:${server_port}`);
// });
