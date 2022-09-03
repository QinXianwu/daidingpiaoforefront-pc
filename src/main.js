import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import api from "@/api/module";
import "@/plugins/index";
import "./assets/styles/index.scss";
import "./icons"; // icon
// import { i18n } from "@/lang/index"; // 多语言
import "virtual:svg-icons-register";

import CONST from "@/constants/index";
import Clipboard from "v-clipboard"; //复制到剪贴板功能
Vue.use(Clipboard);

// 公用组件
import SearchForm from "@/components/SearchForm"; //搜索栏
import TablePanel from "@/components/TablePanel"; //表格
import Pagination from "@/components/Pagination"; //分页
import MTImage from "@/components/MTImage"; //图片
import DrawerPopup from "@/components/DrawerPopup"; //抽屉弹窗
import PageWrapper from "@/components/PageWrapper"; //基础的布局组件

// 公用组件 注册
Vue.component("SearchForm", SearchForm);
Vue.component("TablePanel", TablePanel);
Vue.component("Pagination", Pagination);
Vue.component("MTImage", MTImage);
Vue.component("DrawerPopup", DrawerPopup);
Vue.component("PageWrapper", PageWrapper);

// 注册filter
import filters from "@/filters/index";
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k]));

Vue.config.productionTip = false;
Vue.prototype.AJAX_CODE = CONST.AJAX_CODE;
Vue.prototype.$http = api;
Vue.prototype.$CONST = CONST; // 全局挂载常量

new Vue({
  el: "#app",
  router,
  store,
  // i18n,
  render: (h) => h(App),
});
