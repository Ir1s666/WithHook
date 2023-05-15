import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

const pkgName = pkg.name;

export default defineConfig({
  build: {
    lib: {
      entry: './lib/index.ts',
      name: '',
      fileName: pkgName,
      formats: ['es', 'cjs']
    },
    watch: {
      clearScreen: true,
      include: 'lib/*'
    }
  },
  plugins: [dts()]
})
