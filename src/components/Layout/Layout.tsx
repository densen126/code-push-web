/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { ReactNode } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Layout.css';

interface Props {
    children: ReactNode;
}

function Layout({ children }: Props) {
    return (
        <div>
            {children}
        </div>
    );
}

export default withStyles(s)(Layout);
