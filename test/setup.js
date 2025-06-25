// Set global flags and mocks for tests
global.__DEV__ = true;
if (typeof sessionStorage === 'undefined') {
    global.sessionStorage = {
        setItem: () => {},
        getItem: () => null,
        removeItem: () => {},
    };
}
