import api from "@/api/module";

const state = {
  active: 1, //当前步骤
  userInfo: null, //客户信息
  agentInfo: null, //经销商信息
  pointSaleList: [], // 代售点列表
};

const mutations = {
  SET_ACTIVE(state, data) {
    state.active = data;
  },
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
  SET_AGENT_INFO(state, data) {
    state.agentInfo = data;
  },
  SET_POINT_SALE_LIST(state, data) {
    state.pointSaleList = data;
  },
};

const actions = {
  async GetPointSaleListAction({ commit, state }, isRefresh = false) {
    if (state.pointSaleList.length !== 0 && !isRefresh)
      return state.pointSaleList;
    const [, data] = await api.Base.GetPointSaleList();
    if (!data?.length) return;
    commit("SET_POINT_SALE_LIST", data);
    return data || [];
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
