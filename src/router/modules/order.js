import MainLayout from "@/layouts/MainLayout/index";
import TicketsList from "@/views/Order/views/TicketsList/index.vue";
import AfterSales from "@/views/Order/views/AfterSales/index.vue";
import AfterSalesLogistics from "@/views/Order/views/AfterSalesLogistics/index.vue";

export default {
  path: "/Order",
  component: MainLayout,
  redirect: "/Order/TicketsList",
  meta: {
    title: "订单出票",
    icon: "el-icon-s-help",
    affix: true,
  },
  children: [
    {
      path: "TicketsList",
      component: TicketsList,
      name: "TicketsList",
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
