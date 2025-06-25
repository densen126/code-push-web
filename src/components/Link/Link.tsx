/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { ReactNode, MouseEvent } from 'react';
import history from '../../core/history';

function isLeftClickEvent(event) {
    return event.button === 0;
}

function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

interface Props {
    to: string;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
    children: ReactNode;
    [key: string]: any;
}

function Link({ to, onClick, children, ...props }: Props) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            onClick(event);
        }

        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        event.preventDefault();
        history.push(to);
    };

    return (
        <a href={to} {...props} onClick={handleClick}>
            {children}
        </a>
    );
}

export default Link;
