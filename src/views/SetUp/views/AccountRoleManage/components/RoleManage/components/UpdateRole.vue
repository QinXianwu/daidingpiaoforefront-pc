// 编辑/新增角色
<template>
  <div class="UpdateRole">
    <div class="container">
      <div class="title">{{ roleId ? "编辑" : "新增" }}角色</div>
      <div class="c_box-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="角色名称:" class="label required" prop="Name">
            <el-input
              :value="form.Name"
              v-model="form.Name"
              class="input-medium"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色权限" class="label" prop="RoleList">
            <PermissionTree
              ref="PermissionTree"
              @roleChange="calShowPressionList"
            />
            <div class="existed_permission">
              <div class="head">
                <div class="head_l">已选权限</div>
                <div
                  class="head_r"
                  @click="() => $refs.readPermissionTree.heanldTreeState()"
                >
                  展开/收起
                </div>
              </div>
              <div class="read_permission">
                <ReadPermissionTree
                  ref="readPermissionTree"
                  v-if="showPressionList"
                  :permissionInfo="showPressionList"
                />
                <div class="no_permission" v-else>暂无权限~</div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div
        class="bottom-btn"
        :class="{ fullWidth: sidebar.opened, colseWidth: !sidebar.opened }"
      >
        <el-button
          type="primary"
          :loading="uploadLoading"
          @click="handleSubmit"
        >
          保存
        </el-button>
        <el-button @click="$emit('close')"> 取消 </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import PermissionTree from "./PermissionTree.vue";
import ReadPermissionTree from "./ReadPermissionTree.vue";
import { mapGetters } from "vuex";
export default {
  props: {
    roleId: Number,
  },
  components: { PermissionTree, ReadPermissionTree },
  data: function () {
    return {
      roleInfo: null,
      permissionList: [],
      uploadLoading: false,
      form: {
        Name: "",
        type: "insert", // insert-添加 update-修改
      },
      rules: {
        Name: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              // 校验特殊符号
              if (
                !value.replace(
                  /[`~!@#$%^&*()\-+=<>?:"{}|,./\\;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
                  ""
                )
              ) {
                callback(
                  new Error(
                    "名称只可以使用 _ 字符，不允许以其他特殊字符命名哦~ "
                  )
                );
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      selectedRoleList: [],
      showPressionList: [],
    };
  },
  async mounted() {
    if (this.roleId) this.getAppRoleInfo();
  },
  computed: {
    // 所有角色对应权限
    pressionListAll() {
      return this.$store.state.role.pressionListAll;
    },
    // 所有角色id对应权限map
    ...mapGetters({
      pressionListAllMap: "role/pressionListAllMap",
      sidebar: "sidebar",
    }),
  },
  methods: {
    // 展示权限 val => (selectedRoleList = val)
    calShowPressionList(selectedRoleList) {
      this.selectedRoleList = selectedRoleList;
      if (!selectedRoleList?.length) {
        this.showPressionList = [];
        return;
      }
      // 这个操作延迟一下再执行 页面会有点卡
      setTimeout(() => {
        const result = [];
        const resultMap = {};
        selectedRoleList.forEach((RoleId) => {
          if (this.pressionListAllMap[RoleId]) {
            const stack = [...this.pressionListAllMap[RoleId].permission];
            while (stack.length > 0) {
              const item = stack.pop();
              if (item.ChildList?.length) {
                stack.unshift(...item.ChildList);
              }
              if (!resultMap[item.PermissionId]) {
                result.push(item);
                resultMap[item.PermissionId] = item;
              }
            }
          }
        });
        this.showPressionList = this.translateDataToTree(
          result,
          "Id",
          "Pid",
          0
        );
      }, 100);
    },
    // 获取角色详情
    async getAppRoleInfo() {
      const [, res] = await this.$http.AppRole.GetAppRoleInfo({
        RoleId: this.roleId,
      });
      if (!res) return;
      this.roleInfo = res;
      // 处理数据
      this.handleData();
    },
    // 处理提交
    async handleSubmit() {
      // 表单校验
      const valid = await this.$refs.form.validate();
      this.uploadLoading = true;
      if (!valid) {
        return;
      }
      const { Name, type } = this.form;
      const [, res] = await this.$http.AppRole.AddEditAppRole({
        RoleList: this.selectedRoleList,
        Name,
        type,
        VirtualRoleId: this.roleId || undefined,
      });
      this.uploadLoading = false;
      if (!res) {
        return this.$message.error(
          (res && res.Message) || `${this.roleInfo ? "编辑" : "新增"}角色失败`
        );
      }
      this.$message.success(
        res.Message || `${this.roleInfo ? "编辑" : "新增"}角色成功`
      );
      this.uploadLoading = false;
      this.$emit("close", true);
    },
    // 处理数据
    handleData() {
      this.$refs.form && this.$refs.form.resetFields();
      if (this.roleInfo) {
        this.form = {
          ...this.roleInfo,
          type: "update",
        };
        // this.selectedRoleList = this.roleInfo.ReferenceRole;
        this.$refs.PermissionTree.initCheckPermission(
          this.roleInfo.ReferenceRole
        );
      }
    },
    /**
     * 该方法用于将有父子关系的数组转换成树形结构的数组
     * 接收一个具有父子关系的数组作为参数
     * 返回一个树形结构的数组
     * @parentProp 用来判断父级的属性
     * @originProp 原数据的唯一标识
     * @topTargetVal 判断最高级属性的值
     */
    translateDataToTree(data, originProp, parentProp, topTargetVal) {
      //没有父节点的数据
      let parents = data.filter(
        (value) =>
          value[parentProp] === undefined || value[parentProp] === topTargetVal
      );

      //有父节点的数据
      let children = data.filter(
        (value) =>
          value[parentProp] !== undefined && value[parentProp] !== topTargetVal
      );

      //定义转换方法的具体实现
      let translator = (parents, children) => {
        // 遍历父节点数据
        parents.forEach((parent) => {
          //遍历子节点数据
          children.forEach((current, index) => {
            //此时找到父节点对应的一个子节点
            if (current[parentProp] === parent[originProp]) {
              //对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
              let temp = JSON.parse(JSON.stringify(children));
              //让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
              temp.splice(index, 1);
              //让当前子节点作为唯一的父节点，去递归查找其对应的子节点
              translator([current], temp);
              //把找到子节点放入父节点的childrens属性中
              if (typeof parent.ChildList !== "undefined") {
                const isExit = parent.ChildList.findIndex((p) => {
                  return p.PermissionId === current.PermissionId;
                });
                if (isExit === -1) parent.ChildList.push(current);
              } else {
                parent.ChildList = [current];
              }
            }
          });
        });
      };
      //调用转换方法
      translator(parents, children);
      //返回最终的结果
      return parents;
    },
  },
};
</script>
<style lang="scss" scoped>
.UpdateRole {
  .container {
    background: #ffffff;
    .title {
      padding: 10px 0 0;
      font-size: 15px;
      color: $main-font-color;
      font-weight: bold;
    }
    .c_box-form {
      padding: 30px 0 40px;
    }
    .bottom-btn {
      padding: 20px 0;
      position: fixed;
      bottom: 0;
      right: 0;
      background-color: #fff;
      text-align: center;
      &.fullWidth {
        width: calc(100% - #{$sideBarWidth});
      }
      &.colseWidth {
        width: calc(100% - #{$sideBarCloseWidth});
      }
    }
    ::v-deep .el-input__inner,
    ::v-deep .el-textarea__inner {
      color: #000;
      font-size: 14px;
    }
  }
}
.UpdateRole .existed_permission {
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
  margin: 25px 0 0;
  .head {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    &::before {
      content: "";
      display: block;
      width: 2px;
      height: 14px;
      background-color: $--color-primary;
      margin: 0 5px 0 10px;
    }
    &_l {
      color: #282828;
    }
    &_r {
      margin: 0 16px;
      color: $--color-primary;
      cursor: pointer;
    }
  }
  .read_permission {
    background: #f7f8fa;
    padding: 10px 30px 30px;
    ::v-deep .el-tree {
      background: #f7f8fa;
    }
  }
  .no_permission {
    font-size: 14px;
    font-weight: 400;
    color: $tip-font-color;
  }
}
</style>
