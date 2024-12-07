import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  logLevel: 'info', // Show error logs in the terminal
  clearScreen: false, // Keeps the terminal output during HMR (Hot Module Replacement)
});
