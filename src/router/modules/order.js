import OrderRouterChildren from "../config/order";
import MainLayout from "@/layouts/MainLayout/index";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/404",
  meta: {
    title: "订单出票",
    icon: "order",
    affix: true,
  },
  children: OrderRouterChildren,
};
