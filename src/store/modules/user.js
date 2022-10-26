const userInfo = localStorage.getItem("user_info") || {};

const state = {
  userInfo: JSON.parse(userInfo),
};

const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
