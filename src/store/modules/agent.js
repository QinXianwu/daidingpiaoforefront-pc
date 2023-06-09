import api from "@/api/module";

const state = {
  active: 1, //当前步骤
  userInfo: null, //客户信息
  agentInfo: null, //经销商信息
  pointSaleList: [], // 代售点列表
  pointSaleAction: [], // 代售点Action 新订单通知
  alipayAccountList: [], // 支付宝账号列表
  notHandleOrderCountMap: {}, // 未处理订单数量map
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
  SET_POINT_SALE_ACTION(state, data) {
    state.pointSaleAction = data;
  },
  SET_ALIPAY_ACCOUNT_LIST(state, data) {
    state.alipayAccountList = data;
  },
  SET_NOT_HANDLE_ORDER_COUNT_MAP(state, data) {
    state.notHandleOrderCountMap = data || {};
  },
};

const actions = {
  async GetPointSaleListAction({ commit, state }, isRefresh = false) {
    if (state.pointSaleList.length !== 0 && !isRefresh)
      return state.pointSaleList;
    const [, data] = await api.Base.GetPointSaleList();
    commit("SET_POINT_SALE_LIST", data?.length ? data : []);
    commit("SET_POINT_SALE_ACTION", data?.length ? data : []);
    return data || [];
  },
  async GetAlipayAccountListAction({ commit, state }, isRefresh = false) {
    if (state.alipayAccountList.length !== 0 && !isRefresh)
      return state.alipayAccountList;
    const [, data] = await api.Base.GetAlipayAccountList();
    if (!data?.length) return;
    commit("SET_ALIPAY_ACCOUNT_LIST", data);
    return data || [];
  },
};

const getters = {
  // 代售点options
  pointSaleOptions(state) {
    if (!state.pointSaleList?.length) return [];
    return state.pointSaleList.map((item) => ({
      label: item.name,
      value: item.code,
    }));
  },
  // 支付宝账号options
  alipayAccountOptions(state) {
    if (!state.alipayAccountList?.length) return [];
    return state.alipayAccountList.map((item) => ({
      label: item.alipayAccount,
      value: item.id,
    }));
  },
  // 订单出票未处理数量map
  ticketsNnotHandOrderMap(state) {
    const map = {};
    const options = state.notHandleOrderCountMap?.notHandOrderList || [];
    if (!options?.length) return map;
    options.map((item) => {
      if (item?.code) {
        map[item.code] = Number(item.count);
      }
    });
    return map;
  },
  // 订单退票未处理数量map
  refundNnotHandOrderMap(state) {
    return state.notHandleOrderCountMap?.refundCount || 0;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
