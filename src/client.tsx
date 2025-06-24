// import React, { Suspense } from 'react';
// import { hydrateRoot } from 'react-dom/client';
// import App from 'components/App';
// import routes from 'routes';

// const route = routes.find(r => r.path === window.location.pathname) || routes.find(r => r.path === '*');

// hydrateRoot(
//   document.getElementById('root')!,
//   <Suspense fallback={<div>Loading...</div>}>
//     <App>
//       {route?.component ? React.createElement(route.component) : null}
//     </App>
//   </Suspense>
// );

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './components/App';

declare global {
  interface Window {
    __INITIAL_DATA__?: {
      path?: string;
    };
  }
}

const initialPath = window.__INITIAL_DATA__?.path || window.location.pathname;

hydrateRoot(document.getElementById('root')!, <App currentPath={initialPath} />);

