import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("订单退票相关接口网络请求出错", error);
});

export default {
  // 获取现金退票列表
  GetTicketingRefundCashList(params) {
    return catchAsyncFun(
      apiFetch({
        url: apiPrefix + "/refund/cash",
        params,
        method: "post",
      })
    );
  },
};
