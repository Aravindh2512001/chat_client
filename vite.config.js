import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  logLevel: 'info', // Show error logs in the terminal
  clearScreen: false, // Keeps the terminal output during HMR (Hot Module Replacement)
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@api': path.resolve(__dirname, 'src/api'), // Add alias for api
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, 'src/common/components') // Alias for components
    }
  }
});
