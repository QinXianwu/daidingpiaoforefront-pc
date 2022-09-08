import MainLayout from "@/layouts/MainLayout/index";
import TicketsSearch from "@/views/OrderSearch/views/TicketsSearch/index.vue";

export default {
  path: "/customerService",
  component: MainLayout,
  redirect: "/customerService",
  meta: {
    title: "联系客服",
    icon: "customer_service",
    affix: true,
    // PermissionId: PERMISSION_ID.Home,
  },
  children: [
    {
      path: "TicketsSearch",
      component: TicketsSearch,
      name: "TicketsSearch1",
      meta: {
        title: "出票查询&回填信息修改",
      },
    },
    {
      path: "TicketsSearch2",
      component: TicketsSearch,
      name: "TicketsSearch2",
      meta: {
        title: "出票查询&回填信息修改",
      },
    },
  ],
};
