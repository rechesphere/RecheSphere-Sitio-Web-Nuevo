import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga variables de entorno locales si existen (.env)
  const env = loadEnv(mode, process.cwd(), '');

  // Prioridad: 
  // 1. Entorno del Sistema (Vercel) 
  // 2. Archivo .env local
  // 3. Fallback hardcoded (solo para emergencias/local sin .env)
  const API_KEY = process.env.API_KEY || env.API_KEY || "AIzaSyB5uBSibl14v4DOjSBzM0MiluMr0UKd39E";
  
  return {
    plugins: [react()],
    define: {
      // Inyectamos la clave en el cliente
      'process.env.API_KEY': JSON.stringify(API_KEY),
      
      // Polyfill simple para evitar errores de librerías que buscan "process"
      'process.env': {
        API_KEY: API_KEY,
        NODE_ENV: mode
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
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
