import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      allow: [
        // Allow serving files from one level up (the whole monorepo structure)
        path.resolve(__dirname, '../..')
      ]
    }
  }
});
