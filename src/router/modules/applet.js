import AppletOrder from "@/views/Applet/view/AppletOrder";
// import PERMISSION_ID from "@/permission/PERMISSION_ID";

export default {
  path: "/AppletOrder",
  component: AppletOrder,
  name: "AppletOrder",
  hidden: true,
  meta: {
    // PermissionId: PERMISSION_ID.Home,
    notPassPermissionVerify: true,
  },
};
