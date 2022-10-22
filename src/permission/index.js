// 权限控制相关
import Vue from "vue";
import router from "@/router";
import store from "@/store";
import hasPermission from "./hasPermission";
import { clearNum } from "@/api/request";

router.beforeEach(async (to, from, next) => {
  const { permissionHash } = store.state.permission;
  // 清除loading
  clearNum();
  // 如果已经有hash表了，直接跳转
  if (permissionHash) {
    next();
  } else {
    const accessRoutes = await store.dispatch("permission/generateRoutes");
    accessRoutes.forEach((r) => router.addRoute(r));
    next({ ...to, replace: true });
  }
});

// 权限指令
// 使用 v-permission="该操作的权限ID"
// 如果不满足权限，则会被隐藏
Vue.directive("permission", {
  inserted(el, { value: permissionId }) {
    if (!hasPermission(permissionId)) {
      // 隐藏元素
      el.style.display = "none";
    }
  },
});
