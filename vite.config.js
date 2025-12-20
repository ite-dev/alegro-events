import { defineConfig } from "vite";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
    root: "./",
    plugins: [
        FullReload(["public/css/**/*.css"]),
    ],
    build: {
        target: "es2018",
        sourcemap: false,
        cssCodeSplit: true,
        assetsInlineLimit: 4096, // inline small images/fonts <4KB
        rollupOptions: {
            input: {
                main: "index.html",
                gallery: "pages/gallery.html",
                events: "pages/events.html",
                weddings: "pages/weddings.html",
                barbatmitzvah: "pages/bar-bat-mitzvah.html",
                culinary: "pages/culinary.html",
                contactUs: "pages/contact-us.html",
                "404": "404.html",
            },
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) return "vendor";
                    if (id.includes("/src/js/") && id.endsWith(".css")) return "styles";
                },
                chunkFileNames: "assets/js/[name]-[hash].js",
                entryFileNames: "assets/js/[name]-[hash].js",
                assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
            },
        },
        emptyOutDir: true,
    },
    base: "/",
});
