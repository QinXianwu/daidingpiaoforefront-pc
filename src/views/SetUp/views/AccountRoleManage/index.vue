<template>
  <div class="view-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="UserManagement" />
      <el-tab-pane label="角色管理" name="RoleManage" />
    </el-tabs>

    <UserManagement v-if="activeName === 'UserManagement'" />
    <RoleManage v-if="activeName === 'RoleManage'" />
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
}
</style>
