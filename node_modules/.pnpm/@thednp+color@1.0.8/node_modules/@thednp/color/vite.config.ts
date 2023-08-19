import { resolve } from 'path';
import { defineConfig } from 'vite';

const NAME = 'Color';

const fileName = {
  es: `index.mjs`,
  cjs: `index.cjs`,
  iife: `index.js`,
};

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: NAME,
      formats: ['es', 'cjs', 'iife'],
      fileName: (format: string) => fileName[format],
    },
    target: 'ESNext',
    sourcemap: true,
    minify: true
  }
});
