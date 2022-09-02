import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
import store from "@/store/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("客户相关接口网络请求出错", error);
});
// 客户
export default {
  // 客户添加add
  AddUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/write/user/add",
        params,
      })
    );
  },
  // 客户列表
  GetUserList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/get_list",
        params,
      })
    );
  },
  // 客户详情
  GetUserDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/get",
        params,
      })
    );
  },
  // 客户导入
  ImportUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: "/import/user/import",
        params,
      })
    );
  },
  // 客户update
  UpdateUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/write/user/update",
        params,
      })
    );
  },
  // 客户设等级
  SetUserLevel(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/write/user/level_set",
        params,
      })
    );
  },
  // 客户-取客户标签tag_get
  GetTag(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/tag_get",
        params,
      })
    );
  },
  // 客户-取客户标签tag_get
  SetTag(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/write/user/tag_set",
        params,
      })
    );
  },
  // 客户设等级批量level_batch_set
  BatchSetLevel(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/write/user/level_batch_set",
        params,
      })
    );
  },
  // 客户-批量增加客户标签tag_batch_add
  BatchSetTag(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/write/user/tag_batch_set",
        params,
      })
    );
  },
  // 客户-检查手机号使用情况
  MobileCheck(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/mobile_check",
        params,
        isErrorTips: false, // 错误提示
      })
    );
  },
  // 修改推荐人前-查新的供货人是谁
  CheckRecommendUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/recommend_user/check",
        params,
      })
    );
  },
  // 修改推荐人
  UpdateRecommendUser(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/write/user/recommend_user/update",
        params,
      })
    );
  },
  // 用户结构树
  GetUserTree(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/tree_get",
        params,
      })
    );
  },
  // 客户get_option人选择列表,BC端共用option_type1或空所有; 2客户;3经销商
  // { "Data": { "option_type": 3, "channel_id": 2, "filter_key": "13600000102", "rows": 5, "page": 1, "order": "user_id desc" } }
  GetUserOptionsListApi(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/get_option",
        params,
      })
    );
  },
  // 客户-新增客户找供货人(channel_level_id 不传时为新增会员时使用，有值为经销商使用)
  QueryOrderUserApi(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/recommend_user/query_order_user",
        params,
      })
    );
  },
  //获取成长值明细
  // { "Data": { "rows": 10, "page": 1,"order": "create_time desc", "filters":{"rules":[{"field":"user_id","op":"eq","data":"123123123123"}]} } }
  GetGrowthDetailList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/get_growth_detail",
        params,
      })
    );
  },
  // 进货结构树
  GetOrderUserTree(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/read/user/order_tree_get",
        params,
      })
    );
  },
  // 设置用户登录密码相关
  SetUserPwd(params) {
    return catchAsyncFun(
      apiFetch({
        url: `bscom/api/User/SetUserPwd?env=${store.state.app.McatGlobal.ConfigInfo?.Environment}`,
        params: {
          UserType: 1,
          ...params,
        },
        isQueryAll: true,
      })
    );
  },
};
