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
                gallery: 'pages/gallery.html',
                events: 'pages/events.html',
                weddings: 'pages/weddings.html',
                culinary: 'pages/culinary.html',
                contactUs: 'pages/contact-us.html',
                '404': '404.html',
            },
        },
    },
    base: '/',
});

