/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ErrorPage.css';

export interface ErrorInfo {
    name: string;
    message: string;
    stack: string;
}

interface Props {
    error: ErrorInfo;
}

function ErrorPage({ error }: Props) {
    if (__DEV__) {
        return (
            <div>
                <h1>{error.name}</h1>
                <p>{error.message}</p>
                <pre>{error.stack}</pre>
            </div>
        );
    }

    return (
        <div>
            <h1>Error</h1>
            <p>Sorry, a critical error occurred on this page.</p>
        </div>
    );
}

export { ErrorPage as ErrorPageWithoutStyle };
export default withStyles(s)(ErrorPage);
