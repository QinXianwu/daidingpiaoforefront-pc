<template>
  <div class="view-container">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="账号管理"
        name="UserManagement"
        v-permission="$PERMISSION_ID.SystemSetUp_AccountManagement"
      />
      <el-tab-pane
        label="角色管理"
        name="RoleManage"
        v-permission="$PERMISSION_ID.SystemSetUp_RoleManagement"
      />
    </el-tabs>

    <div class="content">
      <UserManagement v-if="activeName === 'UserManagement'" />
      <RoleManage v-if="activeName === 'RoleManage'" />
    </div>
  </div>
</template>
<script>
import UserManagement from "./components/UserManagement/index.vue";
import RoleManage from "./components/RoleManage/index.vue";

export default {
  name: "AccountRoleManage",
  components: {
    UserManagement,
    RoleManage,
  },
  data() {
    return {
      activeName: "UserManagement",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.view-container {
  background: #ffffff;
  .content {
    padding: 20px 0;
  }
}
</style>
