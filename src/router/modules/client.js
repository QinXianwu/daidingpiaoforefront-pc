import MainLayout from "@/layouts/MainLayout/index";
import Level from "@/views/Client/views/Level/index.vue";
import ClientList from "@/views/Client/views/ClientList/index.vue";
export default {
  path: "/Client",
  component: MainLayout,
  redirect: "/Client/ClientList",
  meta: {
    title: "会员管理",
    icon: "el-icon-user-solid",
    affix: true,
    // 添加权限ID，如果不添加的话，默认所有角色都可以访问
  },
  children: [
    {
      path: "ClientList",
      component: ClientList,
      name: "ClientList",
      meta: {
        title: "会员列表",
      },
    },
    {
      path: "Level",
      component: Level,
      name: "ClientLevel",
      meta: {
        title: "会员等级",
      },
    },
  ],
};
