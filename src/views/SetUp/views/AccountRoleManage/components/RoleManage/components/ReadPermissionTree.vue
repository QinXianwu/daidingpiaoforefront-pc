<template>
  <div class="ReadPermissionTree">
    <el-scrollbar style="height: 100%; background-color: #fff">
      <el-tree
        ref="tree"
        node-key="Id"
        :props="defaultProps"
        :data="permissionInfo"
        @node-click="(data, node, e) => (e.expanded = !e.expanded)"
      />
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: "ReadPermissionTree",
  props: {
    permissionInfo: Array,
  },
  data: function() {
    return {
      isAllExpanded: true,
      defaultProps: {
        label: "Title", // 显示的文本
        children: "ChildList", // 指定子树对象
      },
    };
  },
  methods: {
    // 处理收起/展开
    heanldTreeState() {
      const isAllExpanded = this.isAllExpanded;
      this.$refs.tree.$children.forEach(
        item => (item.expanded = !isAllExpanded),
      );
      this.isAllExpanded = !isAllExpanded;
    },
  },
};
</script>
<style lang="scss" scoped>
.ReadPermissionTree {
  height: 450px;
}
</style>
