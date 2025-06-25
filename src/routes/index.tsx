import React from 'react';

interface Route {
    path: string;
    component: React.ComponentType;
    title?: string;
    status?: number;
}

const Home: React.FC = () => <h1>Hello from Home</h1>;
const NotFound: React.FC = () => <h1>404 Not Found</h1>;

const routes: Route[] = [
    { path: '/', component: Home, title: 'Home', status: 200 },
    { path: '*', component: NotFound, title: 'Not Found', status: 404 },
];

export default routes;
