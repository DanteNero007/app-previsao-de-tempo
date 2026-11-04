import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), nitro(), tailwindcss()],
})









