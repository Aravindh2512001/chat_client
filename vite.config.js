import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";


export default defineConfig({
  plugins: [react()],
  logLevel: 'info', 
  clearScreen: false, 
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@api': path.resolve(__dirname, 'src/api'), 
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, 'src/common/components') 
    }
  }
});
