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
import s from './Page.css';

interface Props {
    title: string;
    html: string;
}

function Page({ title, html }: Props) {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}

export default withStyles(s)(Page);
