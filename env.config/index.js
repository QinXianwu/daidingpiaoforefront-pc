const modulesEnv = {
  dev: require("./dev"),
  prod: require("./prod"),
  pre: require("./pre"), // 预发布版/演示版
};

const VITE_APP_ENV_ID = process.env.VITE_APP_ENV_ID || "dev"; // 默认dev

// 附加在 process.env 上
for (let key in modulesEnv[VITE_APP_ENV_ID]) {
  process.env[key] = modulesEnv[VITE_APP_ENV_ID][key];
}
