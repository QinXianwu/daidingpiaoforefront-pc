import MainLayout from "@/layouts/MainLayout/index";
import Tickets from "@/views/Order/views/Tickets/index.vue";
import AfterSales from "@/views/Order/views/AfterSales/index.vue";
import AfterSalesLogistics from "@/views/Order/views/AfterSalesLogistics/index.vue";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/Order/Tickets",
  meta: {
    title: "订单出票",
    icon: "el-icon-s-help",
    affix: true,
  },
  children: [
    {
      path: "Tickets",
      component: Tickets,
      name: "Tickets",
      meta: {
        title: "打票及回填",
      },
    },
    {
      path: "AfterSales",
      component: AfterSales,
      name: "AfterSales",
      meta: {
        title: "取车票报销凭证",
      },
    },
    {
      path: "AfterSalesLogistics",
      component: AfterSalesLogistics,
      name: "AfterSalesLogistics",
      meta: {
        title: "取报销凭证快递",
      },
    },
  ],
};
