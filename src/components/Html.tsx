import React, { ReactNode } from 'react';

interface HtmlProps {
    children: ReactNode;
    currentPath: string;
    title?: string;
}

const Html: React.FC<HtmlProps> = ({ children, title = 'SSR App', currentPath = "/" }) => (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <script defer src="/public/assets/main.js"></script>
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: typeof children === 'string' ? children : '' }} />
            <script dangerouslySetInnerHTML={{
                __html: `window.__INITIAL_DATA__ = {path: "${currentPath}"};`
            }} />
        </body>
    </html>
);

export default Html;
