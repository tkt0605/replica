import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: false,   // ← 明示的に無効
    },
    hmr:{
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173
    },
  },
})
