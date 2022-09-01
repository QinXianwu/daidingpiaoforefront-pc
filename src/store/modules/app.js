const sidebarOpened = localStorage.getItem("sidebarStatus");

const state = {
  sidebar: {
    opened: sidebarOpened ? !!+sidebarOpened : true,
    withoutAnimation: false,
  },
  device: "desktop",
  size: localStorage.getItem("size") || "medium",
  // 全局读取的配置
  McatGlobal: window.McatGlobal || {},
};

const getters = {
  // 和当前系统同级的前端系统列表
  FEApplicationList(state) {
    const AppInfo = state.McatGlobal.AppInfo;
    // 获取当前系统的 AplicationId
    const currentApplicationId = AppInfo?.Application?.AplicationId;
    // 根据当前 ApplicationId 找到对应的 AplicationItem
    const AplicationItem = AppInfo?.ListAppSys?.find((item) =>
      item?.SysBaseInfo?.Applications.find(
        (aItem) => aItem?.AplicationId === currentApplicationId
      )
    );
    // 在当前的 AplicationItem 中的Applications找到前端的系统id
    const result = (AplicationItem?.SysBaseInfo?.Applications || [])?.filter(
      (item) => item?.ApplicationBaseInfo?.ClientType === 1
    );
    return result.map((item) => ({
      ...item,
      AplicationId: String(item.AplicationId),
    }));
  },
  // 当前系统的TenantId、AppId、AppSysId
  AppSysBaseIDs(state) {
    const AppInfo = state.McatGlobal.AppInfo;
    // 当前 AplicationId
    const currentApplicationId = AppInfo?.Application?.AplicationId;
    // 当前 ApplicationId 对应的 AplicationItem
    const AplicationItem = AppInfo?.ListAppSys.find((item) =>
      item?.SysBaseInfo?.Applications.find(
        (aItem) => aItem?.AplicationId === currentApplicationId
      )
    );
    return {
      TenantId: AppInfo?.TenantId,
      AppId: AppInfo?.AppId,
      AppSysId: AplicationItem?.AppSysId,
    };
  },
};

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      localStorage.setItem("sidebarStatus", 1);
    } else {
      localStorage.setItem("sidebarStatus", 0);
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    localStorage.setItem("sidebarStatus", 0);
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device;
  },
  SET_SIZE: (state, size) => {
    state.size = size;
    localStorage.setItem("size", size);
  },
};

const actions = {
  toggleSideBar({ commit }) {
    commit("TOGGLE_SIDEBAR");
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit("CLOSE_SIDEBAR", withoutAnimation);
  },
  toggleDevice({ commit }, device) {
    commit("TOGGLE_DEVICE", device);
  },
  setSize({ commit }, size) {
    commit("SET_SIZE", size);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
