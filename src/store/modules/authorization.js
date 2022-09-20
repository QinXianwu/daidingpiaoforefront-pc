import Vue from "vue";
import api from "@/api/module";
import CONST from "@/constants/index";
import CookieStore from "@/utils/common";
import ELEMENT from "element-ui";
import router, { resetRouter } from "@/router/index";

const state = {
  state: CookieStore.getCookie("user_sessino") || null,
};

const mutations = {
  SET_USER_SIGNIN(state, data) {
    CookieStore.setCookie("user_sessino", data);
    Object.assign(state, data);
  },
  SET_USER_SIGNOUT(state) {
    CookieStore.delCookie("user_sessino");
    Object.keys(state).forEach((k) => Vue.delete(state, k));
  },
};

const actions = {
  // 退出登录
  LogoutAsync({ commit }) {
    resetRouter(); // 重置路由
    commit("SET_USER_SIGNOUT");
    location.href = "/";
  },
  // 去登录
  LoginAsync({ commit }) {
    resetRouter();
    router.push({ path: "/401" });
    commit("SET_USER_SIGNOUT");
    setTimeout(() => {
      window.introduction && window.introduction.exit();
    });
    ELEMENT.MessageBox.alert(
      "没有授权或者授权过期了，点击确定跳转到登录页"
    ).then(() => {
      location.href = "/";
    });
  },
  // 登录
  async Login({ commit }, userInfo) {
    const { username, password } = userInfo;
    const [, res] = await api.Authorization.Login({
      account: username,
      password: password,
      subAccount: "",
    });
    if (Number(res?.code) === CONST.AJAX_CODE.SUCCESS && res?.data) {
      const token = res.data?.token;
      CookieStore.setCookie("user_sessino", token, 1);
      commit("SET_USER_SIGNIN", token);
      location.href = "/";
      ELEMENT.Message.success("登录成功");
    } else {
      ELEMENT.Message.error("账号密码有误,请重试");
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
