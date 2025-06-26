declare module '*.css';
declare module '*.json';
declare module 'cookie-parser';
declare module 'pretty-error';
declare module 'query-string';
declare module 'history';
declare module 'redux-logger';
declare module 'isomorphic-style-loader/withStyles';
declare module 'chai';
declare module 'enzyme';
declare module 'redux-mock-store';
declare module 'draft-js';
declare module 'validator';
declare module 'uuid';
declare module 'bluebird';

declare const module: {
  hot?: {
    accept(deps?: string | string[], callback?: () => void): void;
  };
};

interface Window {
    APP_STATE: any;
    ga?: (...args: any[]) => void;
}

declare const __DEV__: boolean;

interface NodeModule {
    hot?: {
        accept(path: string, callback: () => void): void;
    };
}

interface NodeRequire {
    ensure(deps: string[], callback: (require: NodeRequire) => void, chunkName?: string): void;
}
