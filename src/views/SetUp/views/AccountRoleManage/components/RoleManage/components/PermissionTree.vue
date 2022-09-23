<template>
  <div class="PermissionTree">
    <div class="main_l">
      <div class="head">
        <div class="head_l title">选择角色</div>
        <div class="head_r count">已选（{{ checkPermissionList.length }}）</div>
      </div>
      <div class="content">
        <el-scrollbar
          wrapStyle="overflow-x: hidden;"
          style="height: 100%; background-color: #fff"
        >
          <el-checkbox-group
            v-model="checkPermissionList"
            @change="handlePressionCheck"
          >
            <div
              class="row_select"
              :key="index"
              v-for="(item, index) in roleOptions"
              :class="{ row_select_click: cur_id === item.RoleId }"
            >
              <el-checkbox :label="item.RoleId" :value="item.RoleId">
                <div class="permission_info">
                  <div class="info">
                    <div class="label">{{ item.Name }}</div>
                    <div class="describe" v-if="item.Remarks">
                      {{ item.Remarks }}
                    </div>
                  </div>
                </div>
              </el-checkbox>
              <div
                class="arrow_icon_r"
                :class="{ arrow_active: cur_id === item.RoleId }"
                @click="handleSetRoleId(item.RoleId)"
              >
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
    </div>
    <div class="main_r checked_list" v-show="cur_id !== -1">
      <div class="head">
        <div class="head_l">{{ curRole && curRole.Name }}权限</div>
        <div
          class="head_r open"
          @click="() => $refs.readPermissionTree.heanldTreeState()"
        >
          展开/收起
        </div>
      </div>
      <div class="content">
        <ReadPermissionTree
          ref="readPermissionTree"
          :permissionInfo="permissionOption"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ReadPermissionTree from "./ReadPermissionTree.vue";
import { mapGetters } from "vuex";
export default {
  name: "PermissionTree",
  components: {
    ReadPermissionTree,
  },
  data() {
    return {
      cur_id: -1, //当前选择的角色id
      checkPermissionList: [], // 选中的权限
      selectPermissionOption: [],
    };
  },
  mounted() {
    // 获取节点
    this.getPageMenuTenantList();
    this.getCenterRoleList();
  },
  methods: {
    // 初始化
    initCheckPermission(permissionList) {
      this.checkPermissionList = [...permissionList];
      this.handlePressionCheck(this.checkPermissionList);
    },
    async getPageMenuTenantList() {
      const [, res] = await this.$http.AppRole.GetPageMenuTenantList();
      if (!res)
        return this.$message.error(
          (res && res.Message) || "获取角色权限列表失败"
        );
      this.selectPermissionOption = res;
    },
    // 获取可选角色列表
    async getCenterRoleList() {
      if (this.getCenterRoleList?.length) {
        return;
      }
      const [, res] = await this.$http.AppRole.GetCenterRoleList();
      if (!res) return;
      this.$store.commit("role/SET_ROLE_OPTION", res);
    },
    // 根据id获取权限
    async handlePressionCheck(list) {
      // 数组长度为0直接丢出去
      if (!list?.length) return this.$emit("roleChange", list);
      list.forEach(async (RoleId) => {
        // 判断原来是否取过值了
        const exit = this.pressionListAllMap[RoleId];
        if (exit) {
          // 取过权限才抛出
          this.$emit("roleChange", list);
          return false;
        }
        const [, res] = await this.$http.AppRole.GetMenuListByRoleId({
          RoleId,
        });
        // 有res且结果为数组就保存id和权限列表
        if (res && Array.isArray(res)) {
          this.$store.commit(
            "role/SET_ROLE_PRESSION_ALL",
            this.pressionListAll.concat([{ RoleId, permission: res }])
          );
        }
        this.$emit("roleChange", list);
      });
    },
    // 设置当前选中项
    async handleSetRoleId(RoleId) {
      this.cur_id = RoleId;
      // 要延迟一下 点击的时候选择数组可能还没更新
      setTimeout(async () => {
        const isSelected = this.checkPermissionList.find((item) => {
          return item === RoleId;
        });
        console.log(this.checkPermissionList, RoleId);
        // 选中的话自动请求 无需手动请求
        if (isSelected) {
          return;
        }
        // 是否有请求过数据
        const hadRequest = this.pressionListAllMap[RoleId];
        // 没有就请求一下
        if (!hadRequest) {
          const [, res] = await this.$http.AppRole.GetMenuListByRoleId({
            RoleId,
          });
          if (res && Array.isArray(res)) {
            this.$store.commit(
              "role/SET_ROLE_PRESSION_ALL",
              this.pressionListAll.concat([{ RoleId, permission: res }])
            );
          }
        }
      }, 100);
    },
  },
  computed: {
    permissionOption({ cur_id, pressionListAll }) {
      const target = pressionListAll.find((item) => {
        return item.RoleId === cur_id;
      });
      return target?.permission || [];
    },
    // 角色列表
    roleOptions() {
      return this.$store.state.role.roleOptions;
    },
    curRole() {
      const curRole = this.roleOptions?.find((item) => {
        return item.RoleId === this.cur_id;
      });
      return curRole || {};
    },
    // 所有角色对应权限
    pressionListAll() {
      return this.$store.state.role.pressionListAll;
    },
    // 所有角色id对应权限map
    ...mapGetters({
      pressionListAllMap: "role/pressionListAllMap",
    }),
    // pressionListAllMap({ pressionListAll }) {
    //   return pressionListAll.reduce((map, item) => {
    //     map[item.RoleId] = item;
    //     return map;
    //   }, {});
    // },
  },
};
</script>
<style lang="scss" scoped>
.PermissionTree {
  width: min-content;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: flex;
  .row_select ::v-deep {
    .el-checkbox {
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
}
.main_l {
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  .content {
    height: 450px;
    padding-bottom: 20px;
  }
}
.main_r {
  max-height: 450px;
  .content {
    height: 402px;
    transition: all 0.3s;
  }
}
.head {
  min-width: 360px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background: #f7f8fa;
  border-radius: 4px 4px 0px 0px;
  font-size: 14px;
  font-weight: 400;
  &_l {
    color: $sub-font-color;
    line-height: 24px;
  }
  &_r {
    color: $--color-primary;
    line-height: 24px;
  }
  .open {
    cursor: pointer;
  }
}
.content {
  .row_select {
    height: 48px;
    display: flex;
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s;

    &:hover,
    &_click {
      background-color: #3c5e9a12;
    }
    .permission_info {
      // width: 320px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .permission_info .info {
      display: flex;
      flex-direction: column;
    }
    .permission_info .info .describe {
      font-size: 11px;
    }

    .permission_info .arrow-r {
      position: absolute;
      right: -250px;
      z-index: 99;
    }
    .arrow_icon_r {
      width: 30px;
      height: 30px;
      font-size: 16px;
      cursor: pointer;
    }
    .arrow_active {
      color: $--color-primary;
    }
    // &::after {
    //   content: "\e6e0";
    //   font-size: 14px;
    //   font-family: element-icons !important;
    //   font-style: normal;
    //   font-weight: 400;
    //   font-variant: normal;
    //   text-transform: none;
    //   line-height: 1;
    //   vertical-align: baseline;
    //   display: inline-block;
    //   -webkit-font-smoothing: antialiased;
    // }
  }
}
</style>
