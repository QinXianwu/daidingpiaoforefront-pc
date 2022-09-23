import MainLayout from "@/layouts/MainLayout/index";
import AccountRoleManage from "@/views/SetUp/views/AccountRoleManage/index";

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
  ],
};
