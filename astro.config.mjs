import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://meruemart.cloud',
    integrations: [sitemap()],
    build: {
        inlineStylesheets: 'auto', // Inline CSS pequeño automáticamente
    },
    vite: {
        build: {
            cssCodeSplit: true, // Split CSS por ruta
            rollupOptions: {
                output: {
                    manualChunks: undefined,
                },
            },
        },
    },
});
