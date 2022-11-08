import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.svg'],
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
  plugins: [
    vue(),
    svgLoader(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
  ],
  resolve: {
    alias: {
      '@': './src',
    },
  },
})
