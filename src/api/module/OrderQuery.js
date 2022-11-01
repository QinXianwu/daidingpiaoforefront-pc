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
  // 获取退票查询列表
  GetTicketRefundList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/refund-ticket",
        params,
        method: "post",
      })
    );
  },
  // 获取退票查询-票款明细
  GetTicketRefundDetail(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/refund-ticket/detail",
        params,
        method: "post",
      })
    );
  },
  // 每日代售点结算查询
  GetEveryDayClearingList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/query/every-day",
        params,
        method: "post",
      })
    );
  },
};