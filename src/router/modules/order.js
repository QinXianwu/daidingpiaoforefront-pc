import orderRouterChildren from "../config/order";
import MainLayout from "@/layouts/MainLayout/index";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/Order/TicketsList",
  meta: {
    title: "订单出票",
    icon: "el-icon-s-help",
    affix: true,
  },
  children: orderRouterChildren,
};
