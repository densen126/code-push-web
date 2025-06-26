export default {

    path: '/',

    // Keep in mind, routes are evaluated in order
    children: [
        require('./home').default,
        require('./login').default,
        require('./login').logout,
        require('./apps').default,
        require('./apps').appDetails,
        require('./apps').deployments,
        require('./accessKeys').default,
        require('./users').default,
        require('./users').settings,
        require('./register').default,
        // Wildcard routes, e.g. { path: '*', ... } (must go last)
        require('./notFound').default,
    ],

    async action({ next }) {
    // Execute each child route until one of them return the result
        const route = await next();

        // Provide default values for title, description etc.
        route.title = `${route.title || 'Untitled Page'}`;
        route.description = route.description || '';

        return route;
    },

};
