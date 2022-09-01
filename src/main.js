import Vue from "vue";
import App from "./App.vue";
import "@/plugins/index.js";
// import { i18n } from "@/lang/index"; // 多语言，暂时注释
import CONST from "@/constants/index";

// import "./assets/styles/index.scss";

Vue.prototype.AJAX_CODE = CONST.AJAX_CODE;
Vue.prototype.$CONST = CONST; // 全局挂载常量

new Vue({
  // i18n,
  render: (h) => h(App),
}).$mount("#app");
