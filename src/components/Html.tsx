// src/components/Html.tsx
import React from 'react';
import serialize from 'serialize-javascript';

interface HtmlProps {
    title: string;
    state: any;
    routeContext: any;
    scripts: string[];
    styles: string[];
    children: React.ReactNode;
}

const Html: React.FC<HtmlProps> = ({
    title,
    state,
    routeContext,
    scripts,
    styles,
    children
}) => (
    <html lang="zh-CN">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <title>{title}</title>
            {styles.map((href) => (
                <link key={href} rel="stylesheet" href={href} />
            ))}
        </head>
        <body>
            {children}
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.__PRELOADED_STATE__=${serialize(state)};
                        window.__ROUTE_CONTEXT__=${serialize(routeContext)};
                    `
                }}
            />
            {scripts.map((src) => (
                <script key={src} src={src} defer />
            ))}
        </body>
    </html>
);

export default Html;
