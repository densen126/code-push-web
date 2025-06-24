import React, { ReactNode } from 'react';
import routes from './../routes';

interface AppProps {
  currentPath?: string;
}

const App: React.FC<AppProps> = ({ currentPath }) => {
  const route = routes.find(r => r.path === currentPath) || routes.find(r => r.path === '*')!;
  return <route.component />;
};

export default App;
