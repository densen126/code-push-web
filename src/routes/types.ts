import React from 'react';

/** 路由 action 必须返回这个类型 */
export interface RouteRes {
    /** 页面标题 */
    title: string;
    /** 要渲染的 React 组件 */
    component: React.ReactNode;
    /** 可选的服务端预取数据 */
    initialData?: any;
}

/** 路由上下文类型，你可以根据需要扩展 */
export interface RouContext {
    /** 当前请求路径 */
    pathname: string;
    /** 路由参数，如动态段 users/:id */
    params: Record<string, string>;
    /** 从 guards 或 action 传递的用户信息 */
    user?: { id: string; roles: string[] };
}
