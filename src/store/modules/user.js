import Vue from "vue";
import ELEMENT from "element-ui";
import router, { resetRouter } from "@/router/index";

const state = {
  state: JSON.parse(sessionStorage.getItem("user_sessino")) || null,
};

const mutations = {
  SET_USER_SIGNIN(state, user) {
    sessionStorage.setItem("user_sessino", JSON.stringify(user));
    Object.assign(state, user);
  },
  SET_USER_SIGNOUT(state) {
    sessionStorage.removeItem("user_sessino");
    Object.keys(state).forEach((k) => Vue.delete(state, k));
  },
};

const actions = {
  // 退出登录
  LogoutAsync({ commit }) {
    resetRouter(); // 重置路由
    commit("SET_USER_SIGNOUT");
    location.href = "/";
    router.push({ path: "/" });
  },
  // 去登录
  LoginAsync() {
    setTimeout(() => {
      window.introduction && window.introduction.exit();
    });
    ELEMENT.MessageBox.alert(
      "没有授权或者授权过期了，点击确定跳转到登录页"
    ).then(() => {
      // location.href = "/Authorization/Login";
      router.push({ path: "/Authorization/Login" });
    });
  },
  // 登录
  async Login({ commit }, userInfo) {
    const { username, password } = userInfo;
    console.log(username, password);
    // const res = await api.login
    const res = {};
    const data = res;
    const isTrue = username === "admin" && password === "123456";
    if (data && isTrue) {
      const toKen = "suahwe1231aa-sdasd";
      //登录成功后将token存储在cookie之中
      sessionStorage.setItem("user_sessino", JSON.stringify(toKen));
      commit("SET_USER_SIGNIN", toKen);
      // router.addRoutes(asyncRoutes); // 动态添加可访问路由表
      // console.log(router);
      location.href = "/"; //登录成功之后重定向到首页
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
