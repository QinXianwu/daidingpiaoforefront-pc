import ELEMENT from "element-ui";
import { resetRouter } from "@/router/index";
const state = {};

const mutations = {};

const actions = {
  // 退出登录
  LogoutAsync({ rootState }) {
    const { ApplicationBaseInfo } =
      rootState.app.McatGlobal.AppInfo?.Application || {};
    resetRouter(); // 重置路由
    location.href = `/${ApplicationBaseInfo?.Route}/bscom/api/Authorization/Logout?env=${rootState.app.McatGlobal.ConfigInfo?.Environment}&returnUrl=${location.href}`;
  },
  // 去登录
  LoginAsync({ rootState }) {
    setTimeout(() => {
      window.introduction && window.introduction.exit();
    });
    ELEMENT.MessageBox.alert(
      "没有授权或者授权过期了，点击确定跳转到登录页"
    ).then(() => {
      const { ApplicationBaseInfo } =
        rootState.app.McatGlobal.AppInfo?.Application || {};
      location.href = `/${ApplicationBaseInfo?.Route}/bscom/api/Authorization/Login?env=${rootState.app.McatGlobal.ConfigInfo?.Environment}&returnUrl=${location.href}`;
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
