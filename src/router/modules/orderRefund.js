import MainLayout from "@/layouts/MainLayout/index";
import ReadyMoney from "@/views/OrderRefund/views/ReadyMoney/index.vue";
import NonReadyMoney from "@/views/OrderRefund/views/NonReadyMoney/index.vue";
import LogisticsManagement from "@/views/OrderRefund/views/LogisticsManagement/index.vue";

export default {
  path: "/OrderRefund",
  component: MainLayout,
  redirect: "/OrderRefund/ReadyMoney",
  meta: {
    title: "订单退票",
    icon: "zichan_o",
    affix: true,
    // PermissionId: PERMISSION_ID.Home,
  },
  children: [
    {
      path: "ReadyMoney",
      component: ReadyMoney,
      name: "ReadyMoney",
      meta: {
        title: "现金退票",
      },
    },
    {
      path: "NonReadyMoney",
      component: NonReadyMoney,
      name: "NonReadyMoney",
      meta: {
        title: "非现金退票",
      },
    },
    {
      path: "LogisticsManagement",
      component: LogisticsManagement,
      name: "LogisticsManagement",
      meta: {
        title: "快递发件",
      },
    },
  ],
};
