module.exports = () => ({
    plugins: [
        require('postcss-partial-import')(),
        require('postcss-url')(),
        require('postcss-custom-properties')(),
        require('postcss-custom-media')(),
        require('postcss-media-minmax')(),
        require('postcss-custom-selectors')(),
        require('postcss-calc')(),
        require('postcss-nesting')(),       // 推荐只用 postcss-nesting，不用 postcss-nested（避免冲突）
        // require('postcss-nested')(),     // 如需支持 Sass 样式嵌套，保留此行，否则注释
        // 'postcss-color-function' 已废弃，改用 color-mod 或 native CSS，注释掉
        // require('postcss-color-function')(),
        // pleeease-filters 可以考虑移除或换其他解决方案
        // require('pleeease-filters')(),
        require('pixrem')(),
        require('postcss-selector-matches')(),
        require('postcss-selector-not')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')(), // 直接用 package.json/browserslist 配置
    ],
});
