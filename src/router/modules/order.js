import orderRouterChildren from "../config/order";
import MainLayout from "@/layouts/MainLayout/index";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/404",
  meta: {
    title: "订单出票",
    icon: "dingdan_o",
    affix: true,
  },
  children: orderRouterChildren,
};
