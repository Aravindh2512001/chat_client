import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  // Plugins
  plugins: [react()],

  // Aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for 'src'
      '@components': path.resolve(__dirname, 'src/components'), // Alias for components folder
      '@utils': path.resolve(__dirname, 'src/utils'), // Alias for utils folder
    },
    mainFields: ['module', 'main'], // Advanced module resolution
  },

  // Build Options
  build: {
    outDir: 'dist', // Output directory
    sourcemap: true, // Generate source maps
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Separate vendor libraries
        },
      },
    },
  },

  // Development Server
  server: {
    port: 3000, // Set custom development server port
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to a backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite API paths
      },
    },
    hmr: {
      overlay: false, // Disable error overlay
    },
  },

  // Logging
  logLevel: 'info', // Options: 'info', 'warn', 'error', 'silent'
  clearScreen: false, // Keep terminal output during HMR

  // CSS Preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // Load global SCSS variables
      },
    },
  },

  // Environment Variables
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL), // Use environment variables
  },

  // Optimize Dependencies
  optimizeDeps: {
    include: ['lodash'], // Pre-bundle lodash
    exclude: ['moment'], // Exclude moment
  },

  // Base Path (useful for deployment in subdirectories)
  base: '/my-app/',

  // SSR Configuration
  ssr: {
    noExternal: ['my-package'], // Prevent specific packages from being externalized
  },

  // Testing (if using Vitest)
  test: {
    globals: true,
    environment: 'jsdom', // Simulate a browser environment
  },
});
