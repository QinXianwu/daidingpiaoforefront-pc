import { apiFetch } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
// async 方法的处理
const catchAsyncFun = createCatchAsyncFun((error) => {
  // 错误日志上报 todo
  console.warn("锁单相关接口网络请求出错", error);
});
// 锁单
export default {
  // 平台锁单接口
  LockOrder(params) {
    return catchAsyncFun(
      apiFetch({
        url: "/lockOrder",
        params,
      })
    );
  },
};
