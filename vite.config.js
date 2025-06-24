import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '9256-2803-9800-b500-7eb2-c4ab-42b0-f6a4-f111.ngrok-free.app', // La URL de ngrok que te dio
    ],
  },
})
