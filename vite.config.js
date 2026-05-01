import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src/webroot',
  base: './',
  build: {
    outDir: '../../Module/webroot',
    emptyOutDir: true,
  },
})
