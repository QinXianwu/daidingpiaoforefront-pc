// vite不能使用require
// 解决方法 引入插件 @originjs/vite-plugin-commonjs 和 @originjs/vite-plugin-require-context
const modulesFiles = require.context("./module/", true, /\.js$/);
const constants = modulesFiles.keys().reduce((modules, modulePath) => {
  const value = modulesFiles(modulePath);
  modules = {
    ...modules,
    ...value,
  };
  return modules;
}, {});

export default constants;
