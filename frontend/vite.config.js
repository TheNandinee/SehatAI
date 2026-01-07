import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Proxy API requests to backend during development
            '/api': {
                target: 'http://backend:8000',
                changeOrigin: true,
            }
        }
    }
});
