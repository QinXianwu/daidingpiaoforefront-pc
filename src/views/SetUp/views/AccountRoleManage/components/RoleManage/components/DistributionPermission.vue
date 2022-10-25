<template>
  <el-dialog
    title="分配角色权限"
    width="550px"
    :visible.sync="visible"
    append-to-body
    @close="handleClose(false)"
  >
    <div class="tree">
      <el-form ref="form" label-width="80px">
        <el-form-item label="角色名称:">
          <span>{{ (editInfo && editInfo.name) || "-" }}</span>
        </el-form-item>
        <el-form-item label="角色权限:">
          <el-tree
            ref="tree"
            v-loading="loadingTree"
            show-checkbox
            node-key="id"
            :data="permissionTree"
            :default-expanded-keys="[]"
            :default-checked-keys="[]"
            :props="defaultProps"
          />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "DistributionPermission",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val && this.editInfo?.id) {
        this.getRolePermission();
      }
    },
  },
  computed: {
    permissionTree({ permissionList }) {
      if (!permissionList?.length) return [];
      return permissionList.map((item) => {
        const first_options = {
          label: item.tag,
          value: item.id,
          id: item.id,
        };
        if (!item.subordinate?.length) return first_options;
        first_options.subordinate = [];
        item.subordinate.forEach((secondItem) => {
          const second_options = {
            label: secondItem.tag,
            value: secondItem.id,
            id: item.id,
          };
          first_options.subordinate.push(second_options);
        });
        return first_options;
      });
    },
  },
  data() {
    return {
      permissionList: [],
      defaultProps: {
        label: "label",
        children: "subordinate",
      },
      loadingTree: false,
      isLoading: false,
    };
  },
  mounted() {
    //
  },
  methods: {
    // 获取角色权限
    async getRolePermission() {
      this.loadingTree = true;
      const [, res] = await this.$http.AccountRoleManage.GetRolePermissionList({
        id: this.editInfo.id,
      });
      this.loadingTree = false;
      this.permissionList = res?.length ? res : [];
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    // 处理提交
    async handleSubmit() {
      //
    },
  },
};
</script>
<style lang="scss" scoped></style>
