import { defineConfig } from 'vite'
import path from "path";
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@customComponents": path.resolve(__dirname, "./src/pages/components"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  server: {
    proxy: {
      // any request starting with /TabebAI → forward to Django
      '/TabebAI': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
