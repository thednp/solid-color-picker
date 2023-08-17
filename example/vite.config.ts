import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import solidSVG from 'vite-plugin-solid-svg'

export default defineConfig({
  plugins: [solidPlugin(), solidSVG()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
