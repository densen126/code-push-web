module.exports = {
    presets: [
        // 编译最新 JS 特性
        ['@babel/preset-env', { targets: { node: 'current' } }],
        // 支持 TS 语法（剥离类型标注）
        '@babel/preset-typescript',
        // 支持 React JSX/TSX
        ['@babel/preset-react', { runtime: 'automatic' }]
    ]
};
