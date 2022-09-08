import home from "./home"; // 首页模块
import order from "./order"; // 订单模块
import orderRefund from "./orderRefund"; // 订单退票模块
import orderSearch from "./orderSearch"; // 订单查询模块
import customerService from "./customerService"; // 联系客服模块

import error from "./error"; //

// 排序直接作用于侧边栏菜到排序
export default [home, order, orderRefund, orderSearch, customerService, error];
