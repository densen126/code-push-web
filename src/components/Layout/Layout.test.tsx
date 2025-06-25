/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env mocha */

import React from 'react';
import { expect } from 'chai';
import { renderToStaticMarkup } from 'react-dom/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import Layout from './Layout';

describe('Layout', () => {
    it('renders children correctly', () => {
        const html = renderToStaticMarkup(
            <StyleContext.Provider value={{ insertCss: () => {} }}>
                <Layout>
                    <div className="child" />
                </Layout>
            </StyleContext.Provider>,
        );
        expect(html).to.contain('class="child"');
    });
});
