// vue.config.js
require("./env.config/index"); // 再次处理 process.env 变量
process.env.VUE_APP_VERSION = require("./package.json").version;
const isDev = process.env.NODE_ENV !== "production";
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const mdcliConfig = require("./mdcli.config");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  outputDir: "dist", // 注意：因为deploy部署脚本需要用到 outputDir ，所以这里必填
  indexPath: "index.html", // 注意：因为deploy部署脚本需要用到 indexPath ，所以这里必填
  publicPath: isDev ? "./" : `./$static_origin/${mdcliConfig.Path}`,
  configureWebpack: {
    devtool: isDev ? "source-map" : "none",
    resolve: {
      alias: {
        "@@": resolve("src/views/ShopManage/views/PageEditor"), //自定义页面的路径 组件层级太多 写相对路径会很长
      },
    },
    plugins: [
      new ProgressBarPlugin({
        format: " build [:bar] :percent (:elapsed seconds)",
        clear: false,
      }),
      // new webpack.DllReferencePlugin({
      //   context: process.cwd(),
      //   manifest: require("./public/vendor/vendor-manifest.json"), // 运行 npm run dll 命令生成
      // }),
      // // 将 dll 注入到 生成的 html 模板中
      // new AddAssetHtmlPlugin({
      //   // dll文件位置
      //   filepath: path.resolve(__dirname, "./public/vendor/*.js"),
      //   // dll 引用路径
      //   publicPath: isDev ? "./vendor" : `$static_origin/spa/vendor`,
      //   // // dll最终输出的目录
      //   outputPath: "./vendor",
      // }),
    ],
    // md文件读取
    module: {
      rules: [
        {
          test: /\.md$/,
          use: ["text-loader"],
        },
      ],
    },
  },
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          // 全局变量文件路径，只有一个时可将数组省去
          resources: [
            "./src/assets/styles/variables.scss",
            "./src/assets/styles/mixin.scss",
          ],
        })
        .end();
    });
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete("prefetch");

    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    config.externals({
      vue: "Vue",
      vuex: "Vuex",
      "element-ui": "ELEMENT",
      axios: "axios",
    });

    config.plugin("html").tap((args) => {
      // 打包模式下使用占位符，后端渲染会处理
      const commonStaticUrl = isDev
        ? "https://img.hmeshop.cn"
        : "${common_static}"; // 静态CDN占位符
      args[0].cdn = {
        css: [
          `${commonStaticUrl}/MAdminStatic/element-ui/theme/index.css`,
          `${commonStaticUrl}/MAdminStatic/intro.js/5.0.0/introjs.min.css`,
        ],
        js: [
          `${commonStaticUrl}/MAdminStatic/vue/vue.min.js`,
          `${commonStaticUrl}/MAdminStatic/vuex/vuex.min.js`,
          `${commonStaticUrl}/MAdminStatic/element-ui/index.js`,
          `${commonStaticUrl}/MAdminStatic/axios/axios.min.js`,
          `${commonStaticUrl}/MAdminStatic/intro.js/5.0.0/intro.min.js`,
          // `${commonStaticUrl}/MAdminStatic/tinymce/tinymce.min.js`,
        ],
      };
      // 保留index.html中的注释
      if (!isDev) {
        args[0].minify.removeComments = false;
      }
      return args;
    });

    // 打包分析
    if (process.env.ANALYZ) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },
  lintOnSave: undefined,
  devServer: {
    // port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      [process.env.VUE_APP_API_PREFIX]: {
        target: process.env.VUE_APP_BASE_API_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          [process.env.VUE_APP_API_PREFIX]: process.env.VUE_APP_API_PREFIX,
        },
      },
      "/api": {
        target: process.env.VUE_APP_BASE_API_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "/api": "/api",
        },
      },
      "/s": {
        target: process.env.VUE_APP_BASE_API_URL,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          "/s": "/s",
        },
      },
    },
  },
};
