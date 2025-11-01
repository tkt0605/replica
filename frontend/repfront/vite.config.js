import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // ← Tailwind v4 ではこれが必要
  ],
  server: {
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