import MainLayout from "@/layouts/MainLayout/index";
import AccountRoleManage from "@/views/SetUp/views/AccountRoleManage/index";
import PayConfig from "@/views/SetUp/views/PayConfig/index";
import SystemNotification from "@/views/SetUp/views/SystemNotification/index";

export default {
  path: "/SetUp",
  component: MainLayout,
  redirect: "/SetUp",
  name: "SetUp",
  meta: {
    title: "系统设置",
    icon: "setup",
  },
  children: [
    {
      path: "AccountRoleManage",
      component: AccountRoleManage,
      name: "AccountRoleManage",
      meta: { title: "账号角色管理" },
    },
    {
      path: "PayConfig",
      component: PayConfig,
      name: "PayConfig",
      meta: {
        title: "支付配置",
      },
    },
    {
      path: "SystemNotification",
      component: SystemNotification,
      name: "SystemNotification",
      meta: { title: "系统通知" },
    },
  ],
};
