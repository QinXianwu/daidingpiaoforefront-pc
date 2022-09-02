import { apiFetch, apiPrefix } from "@/api/request";
import { createCatchAsyncFun } from "@/utils/index";
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
};
