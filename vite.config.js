import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// PORT env var support so parallel Claude Code sessions never collide on ports.
const port = Number(process.env.PORT) || 5173

export default defineConfig({
  plugins: [react()],
  server: { port, strictPort: false },
  preview: { port, strictPort: false },
})
