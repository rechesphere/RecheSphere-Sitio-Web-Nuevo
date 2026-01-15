import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Tu API Key hardcoded para asegurar que funcione siempre
  const HARDCODED_API_KEY = "AIzaSyB5uBSibl14v4DOjSBzM0MiluMr0UKd39E";
  
  return {
    plugins: [react()],
    define: {
      // Inyectamos la clave directamente en process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(HARDCODED_API_KEY),
      
      // Polyfill completo del objeto process para evitar errores de "process is not defined"
      'process': {
        env: {
          API_KEY: HARDCODED_API_KEY,
          NODE_ENV: mode
        },
        version: '' // Mock version
      },
      // Redundancia para asegurar compatibilidad
      'process.env': {
        API_KEY: HARDCODED_API_KEY,
        NODE_ENV: mode
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split code for performance
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-ui': ['framer-motion', 'lucide-react'],
            'vendor-ai': ['@google/genai'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  };
});