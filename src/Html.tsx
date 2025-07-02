import React, { ReactNode } from 'react';
import serialize from 'serialize-javascript';

interface HtmlProps { content: ReactNode; data: any; scripts: string[]; }

const Html: React.FC<HtmlProps> = ({ content, data, scripts }) => (
    <html>
        <head>
            <meta charSet="utf-8" />
            <title>{data.title}</title>
            <link rel="stylesheet" href="/public/main.css" />
            {/* 将初始数据注入到客户端脚本中 */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.__INITIAL_STATE__=${serialize(data)};</script>`
                }}
            />
        </head>
        <body>
            <div id="root">
                {content}
            </div>
            {scripts.map(script => <script key={script} src={script} />)}
        </body>
    </html>
);

export default Html;
