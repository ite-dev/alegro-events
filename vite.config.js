import { defineConfig } from 'vite';
import FullReload from 'vite-plugin-full-reload';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    plugins: [
        FullReload(['public/css/**/*.css']),
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                gallery: resolve(__dirname, 'pages/gallery.html'),
                weddings: resolve(__dirname, 'pages/weddings.html'),
                contactUs: resolve(__dirname, 'pages/contact-us.html'),
                '404': resolve(__dirname, 'pages/404.html'),
            },
        },
        outDir: 'dist',
    },
    base: '/',
});
