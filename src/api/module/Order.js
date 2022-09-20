import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("订单相关接口网络请求出错", error);
});

export default {
  // 获取打票及回填订单列表
  GetOrderWaitList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/order/waiting/list",
        params,
        isQueryAll: true,
        method: "get",
      })
    );
  },
};
