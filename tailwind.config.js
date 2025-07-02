/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{ts,tsx,js,jsx}'
    ],
    theme: {
        extend: {
            borderRadius: {
                xl: '1rem',
                '2xl': '1.5rem'
            }
        }
    },
    darkMode: 'class',
    plugins: []
};
