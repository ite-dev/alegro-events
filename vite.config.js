import {defineConfig} from 'vite';

export default defineConfig({
    root: '.',
    build: {
        rollupOptions: {
            inpurt: {
                main: 'index.html',
                weddings: 'pages/weddings.html',
            },
        },
    },
    base: '/',
});

