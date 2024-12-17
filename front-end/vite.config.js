import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/rest/api': {
        target: 'https://ssapp3-7f4178e843cf.herokuapp.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})