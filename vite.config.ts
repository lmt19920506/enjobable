import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// import { path } from 'path'

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { resolve } from "path";
import postcsspxtoviewport from "postcss-px-to-viewport";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: '0.0.0.0', // 这个用于启动
    port: '8888', // 指定启动端口
    open: true, //启动后是否自动打开浏览器
    proxy:{
      // '/admin': {
      //   target: '',
      //   changeOrigin: true,
      //   rewrite:(path)=>path.replace(/^\/admin/,'')
      // },
      '/api':{
        target:'http://photo-gateway:9999',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/api/,'')
      },
      '/local':{
        target:'http://photo-gateway:9999',
        changeOrigin:true,
        rewrite:(path)=>path.replace(/^\/local/,'')
      },
      // '/newApi':{
      //   target:'http://localhost:3030/newApi',
      //   changeOrigin:true,
      //   rewrite:(path)=>path.replace(/^\/newApi/,'')
      // }
    }
  },
  build: {
    sourcemap: false,
    minify:'terser',
    terserOptions: {
      compress: {
        // 生产环境下移除console
        // drop_console: true,
        // drop_debugger: true,
      },
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData:`@import "./src/assets/styles/index.scss";`
  //     }
  //   }
  // }
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewport({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 1920, // UI设计稿的宽度，如果你的设计稿是375就改成375
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ["ignore-", "lki-", "context-"], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          landscape: false, // 是否处理横屏情况
        }),
      ],
    },
  },
});
