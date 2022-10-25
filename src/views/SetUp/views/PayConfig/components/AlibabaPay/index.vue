<template>
  <div class="AlibabaPay">
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增支付宝账号 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <!-- 操作 -->
      <template #action="{ scope }">
        <div class="action-groud">
          <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
          <el-button type="text" @click="handleDelete(scope)"> 删除 </el-button>
        </div>
      </template>
    </TablePanel>
    <!-- 分页 -->
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.size"
      :current-page="page.current"
      :total="total"
    />
    <!-- 编辑/新增角色 -->
    <UpdatePayAccountDiaog
      :editInfo="editInfo"
      :show.sync="showUpdatePayAccount"
      @close="close"
    />
  </div>
</template>

<script>
import { column } from "./config";
import UpdatePayAccountDiaog from "./components/UpdatePayAccountDiaog.vue";
export default {
  name: "AlibabaPay",
  components: { UpdatePayAccountDiaog },
  data() {
    return {
      column, //表格头
      list: [],
      editInfo: "",
      showUpdatePayAccount: false,
      page: {
        size: 10,
        current: 1,
      },
      query: {},
      total: 0,
      rules: [], //过滤规则
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList(false);
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.showUpdatePayAccount = false;
      if (isRefresh) this.getList();
    },
    handleAdd() {
      this.editInfo = "";
      this.showUpdatePayAccount = true;
    },
    handleEdit(item) {
      console.log(item);
      this.editInfo = item;
      this.showUpdatePayAccount = true;
    },
    async handleDelete({ id }) {
      if (!id) return this.$message.error("获取不到当前账号ID");
      try {
        await this.$confirm("确定要删除当前支付宝账号吗?", "删除提示", {
          type: "warning",
          showClose: false,
        });
        const [err] = await this.$http.PayConfig.DeleteAlipayAccount({ id });
        let msg = err ? err.Message : "删除成功";
        this.$confirm(msg, "删除提示", {
          showClose: false,
          showCancelButton: false,
          type: !err ? "success" : "error",
        }).then(() => {
          if (!err) this.getList();
        });
      } catch (error) {
        error;
      }
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      const query = {
        ...this.page,
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.PayConfig.GetAlipayAccountList(query);
      if (!res?.list?.length) return;
      this.list = res.list;
      this.total = res.total;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.action {
  padding: 0 0 15px;
}
</style>
