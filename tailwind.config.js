/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require("daisyui"),
    ],
    daisyui: {
        themes: [
            "light",       // 亮色
            "dark",        // 暗色
            "cupcake",     // 少女粉
            "synthwave",   // 霓虹炫酷
            "retro",       // 复古
            "valentine",   // 情人节
            "forest",      // 森林绿色
            "luxury"       // 黑金高端
        ],
    },
}
