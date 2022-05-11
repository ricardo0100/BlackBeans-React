import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../BlackBeans-API/app/build',
    assetsDir: './static'
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
