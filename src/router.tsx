import UniversalRouter from 'universal-router';

// 路由表
const routes = [
    {
        path: '/',
        action: () => ({
            title: '首页',
            component: <div>欢迎来到首页！</div>
        })
    },
    {
        path: '/about',
        action: () => ({
            title: '关于',
            component: <div>这是关于页。</div>
        })
    }
];

export const router = new UniversalRouter(routes);
