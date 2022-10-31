import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("订单查询相关接口网络请求出错", error);
});

export default {
  // 获取出票查询 回填信息修改
  GetTicketingList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/ticketing",
        params,
        method: "post",
      })
    );
  },
  // 获取订单统计信息
  GetTicketingStatistics(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/ticketing/order-statistics",
        params,
        method: "post",
        isLoading: false,
      })
    );
  },
};
