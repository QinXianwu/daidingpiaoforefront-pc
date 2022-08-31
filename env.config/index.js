const modulesEnv = {
  dev: require("./dev"),
  prod: require("./prod"),
  offline: require("./offline"),
  pre: require("./pre"), // 预发布版/演示版
  riyun: require("./riyun"),
};

const VUE_APP_ENV_ID = process.env.VUE_APP_ENV_ID || "dev"; // 默认dev

// 附加在 process.env 上
for (let key in modulesEnv[VUE_APP_ENV_ID]) {
  process.env[key] = modulesEnv[VUE_APP_ENV_ID][key];
}
