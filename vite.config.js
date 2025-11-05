import {defineConfig} from 'vite';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
    root: './',
    plugins: [
        FullReload(['public/css/**/*.css'])
    ],
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                weddings: 'pages/weddings.html',
            },
        },
    },
    base: '/',
});

