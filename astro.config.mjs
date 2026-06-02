import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    site: 'https://meruemart.cloud',
    integrations: [sitemap()],
    build: {
        inlineStylesheets: 'auto',
    },
    vite: {
        plugins: [tailwindcss()],
        build: {
            cssCodeSplit: true,
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
            },
        },
    },
});
