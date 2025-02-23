import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  optimizeDeps: {
   
  },
  server: {
    allowedHosts: ['b7c5-182-253-242-208.ngrok-free.app'],
  },

});
