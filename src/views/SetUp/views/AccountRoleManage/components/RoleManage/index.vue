<template>
  <div class="RoleManage">
    <div class="content">
      <div class="main" v-if="!isUpdateRoleList">
        <div class="head">
          <el-button type="primary" @click="isUpdateRoleList = true">
            新增角色
          </el-button>
        </div>
        <TablePanel
          isShowTopCheck
          :checkbox="false"
          :table-head="tableHead"
          :table-data="roleList"
        >
          <!-- 角色名称 -->
          <template slot-scope="scoped" slot="custom_name">
            <div>{{ scoped.scope.name }}</div>
          </template>
          <!-- 操作 -->
          <template slot-scope="scoped" slot="custom_operate">
            <div class="operate action-groud">
              <el-button type="text" @click="updateRole(scoped.scope)">
                编辑
              </el-button>
              <el-button type="text" @click="delRole(scoped.scope)">
                删除
              </el-button>
            </div>
          </template>
        </TablePanel>
      </div>

      <!-- 编辑/新增角色 -->
      <!-- <DrawerPopup v-model="isUpdateRoleList">
        <UpdateRole
          :roleId="roleInfo && roleInfo.VirtualRoleId"
          @close="close"
        />
      </DrawerPopup> -->
    </div>
  </div>
</template>

<script>
// import UpdateRole from "./components/UpdateRole.vue";

export default {
  name: "RoleManage",
  // components: { UpdateRole },
  data() {
    return {
      tableHead: [
        {
          label: "角色名称",
          prop: "Name",
        },
        { label: "操作", prop: "custom_operate", type: "custom" },
      ],
      roleInfo: null,
      roleList: [],
      isUpdateRoleList: false, // 新增/编辑角色
    };
  },
  mounted() {
    // this.getList();
  },
  methods: {
    async getList() {
      const [, res] = await this.$http.AppRole.GetAppRoleList();
      // console.log(res);
      if (!res) return;
      this.roleList = res;
    },
    // 新增/添加角色
    updateRole(data) {
      console.log(data);
      this.roleInfo = data;
      this.isUpdateRoleList = !this.isUpdateRoleList;
    },
    // 删除
    async delRole(data) {
      try {
        await this.$confirm("确定要删除该角色吗？", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [err] = await this.$http.AppRole.DelAppRole({
          RoleId: data.VirtualRoleId,
          AppId: data.AppId,
          TenantId: data.TenantId,
        });
        let msg = err ? err.Message : "删除成功";
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: !err ? "success" : "error",
        }).then(() => {
          if (!err) this.getList();
        });
      } catch (error) {
        console.log(error);
      }
    },
    close(isRefresh = false) {
      this.roleInfo = null;
      this.isUpdateRoleList = false;
      if (isRefresh) this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.RoleManage {
  .head {
    margin: 0 0 24px;
  }
}

.RoleManage ::v-deep {
  .el-table--small .el-table__cell {
    padding: 0;
  }
  .el-table__header-wrapper {
    .cell {
      height: 48px;
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 48px;
      background: #f7f8fa;
      color: $main-font-color;
    }
  }
  .el-table__body {
    line-height: 56px;
    text-align: center;
    .cell {
      color: $sub-font-color;
      align-items: center;
    }
    .el-table__row {
      height: 56px;
      background: #ffffff;
    }
  }
  .input-medium {
    width: 380px;
  }
  .el-form-item__label {
    color: $main-font-color;
    height: 40px;
  }
}
</style>
