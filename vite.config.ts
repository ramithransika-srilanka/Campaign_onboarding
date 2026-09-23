import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths so the build works from any sub-path or static host.
  base: './',
  plugins: [react()],
});
