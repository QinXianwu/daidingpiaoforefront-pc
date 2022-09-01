require("./env.config/index"); // 再次处理 process.env 变量
import { defineConfig, loadEnv } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // const idDev = mode !== "production";
  console.log(mode, env.VITE_APP_MCAT_ENVIRONMENT);
  return {
    plugins: [createVuePlugin()], // 配置需要使用的插件列表
    base: "./", // 在生产中服务时的基本公共路径
    publicDir: "public", // 静态资源服务的文件夹, 默认"public"
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
      },
      extensions: [".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    // 引入第三方的配置,强制预构建插件包
    optimizeDeps: {
      include: ["echarts", "axios"],
    },
    // 打包配置
    build: {
      target: "modules", // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
      outDir: "dist", // 指定输出路径
      assetsDir: "assets", // 指定生成静态资源的存放路径
      assetsInlineLimit: "4096", // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
      cssCodeSplit: true, // 启用/禁用CSS代码拆分，如果禁用，整个项目的所有CSS将被提取到一个CSS文件中,默认true
      sourcemap: false, // 构建后是否生成 source map 文件
      minify: "terser", // 混淆器，terser构建后文件体积更小
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      }, //去除 console debugger
    },
    // 本地运行配置，及反向代理配置
    server: {
      host: "localhost",
      port: 3000,
      open: false,
      https: false,
      strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
      cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {
        "/api": {
          target: env.VITE_APP_BASE_API_URL, //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
