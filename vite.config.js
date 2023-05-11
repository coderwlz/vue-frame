import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import {
//   AntDesignVueResolver,
// } from 'unplugin-vue-components/resolvers'
import themePreprocessorPlugin from "@zougt/vite-plugin-theme-preprocessor";
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), 
  //   Components({
  //   resolvers: [
  //     AntDesignVueResolver({
  //       resolveIcons: true,
  //     }),
  //   ],
  // }),
  themePreprocessorPlugin({
    less: {
      // 各个主题文件的位置
      multipleScopeVars: [
        {
          scopeName: "theme-default",
          path: path.resolve("src/assets/css/theme/default.less"),
        },
        {
          scopeName: "theme-dark",
          path: path.resolve("src/assets/css/theme/dark.less"),
        },
      ],
    },
})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3434,
    open: true
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: {
        //   "primary-color": "#000",
        //   "link-color": "red"
        // },
        javascriptEnabled: true,
      }
    }
  },
})
