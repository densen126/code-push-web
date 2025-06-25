/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Children, useEffect, ReactElement } from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { v1 as uuidv1 } from 'uuid';
import restApi from '../../network/RestApi';
import { fetchAuth } from '../../actions/authActions';

export interface ContextType {
    insertCss: (...styles: any[]) => () => void;
    store: {
        subscribe: Function;
        dispatch: Function;
        getState: Function;
    };
}

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
interface Props {
    context: ContextType;
    children: ReactElement;
}

function App({ context, children }: Props) {
    useEffect(() => {
        let aQQGuid = localStorage.getItem('aQQ_guid');
        if (_.isEmpty(aQQGuid) || aQQGuid.length < 10) {
            aQQGuid = uuidv1();
            localStorage.setItem('aQQ_guid', aQQGuid);
        }
        let sessid = sessionStorage.getItem('sessid');
        if (_.isEmpty(sessid) || sessid.length < 10) {
            sessid = uuidv1();
            sessionStorage.setItem('sessid', sessid);
        }
        restApi.setUUID(sessid, aQQGuid);
        context.store.dispatch(fetchAuth());
    }, [context.store]);

    return (
        <Provider store={context.store}>
            <div>{Children.only(children)}</div>
        </Provider>
    );
}

export default App;
