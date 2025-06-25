/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import serialize from 'serialize-javascript';
import { analytics } from '../config';

export interface HtmlStyle {
    id: string;
    cssText: string;
}

interface Props {
    title: string;
    description: string;
    styles?: HtmlStyle[];
    scripts?: string[];
    state?: unknown;
    children: string;
}

function Html({ title, description, styles = [], scripts = [], state = null, children }: Props) {
    return (
        <html className="no-js" lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <link rel="stylesheet" href="/css/bootstrap.min.css" />
                {styles.map(style => (
                    <style
                        key={style.id}
                        id={style.id}
                        dangerouslySetInnerHTML={{ __html: style.cssText }}
                    />
                ))}
            </head>
            <body style={{ minHeight: '100%' }}>
                <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                {state && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `window.APP_STATE=${serialize(state, { isJSON: true })}`,
                        }}
                    />
                )}
                {scripts.map(script => (
                    <script key={script} src={script} />
                ))}
                {analytics.google.trackingId && (
                    <script
                        dangerouslySetInnerHTML={{
                            __html:
                                'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                                `ga('create','${analytics.google.trackingId}','auto');ga('send','pageview')`,
                        }}
                    />
                )}
                {analytics.google.trackingId && (
                    <script src="https://www.google-analytics.com/analytics.js" async defer />
                )}
            </body>
        </html>
    );
}

export default Html;
