<template>
  <div class="AlibabaPay">
    <div class="action">
      <el-button type="primary" @click="handleAdd"> 新增账号 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <!-- 操作 -->
      <template #action="{}">
        <div class="action-groud">
          <el-button type="text" @click="handleEdit"> 编辑 </el-button>
          <el-button type="text"> 删除 </el-button>
        </div>
      </template>
    </TablePanel>
    <!-- 分页 -->
    <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.rows"
      :current-page="page.page"
      :total="total"
    />
    <!-- 编辑/新增角色 -->
    <DrawerPopup v-model="showUpdatePayAccount">
      <UpdatePayAccount :id="id" @close="close" />
    </DrawerPopup>
  </div>
</template>

<script>
import { column } from "./config";
import UpdatePayAccount from "./components/UpdatePayAccount.vue";
export default {
  name: "AlibabaPay",
  components: { UpdatePayAccount },
  data() {
    return {
      column, //表格头
      list: [],
      id: "",
      showUpdatePayAccount: false,
      page: {
        rows: 10,
        page: 1,
      },
      query: {},
      total: 0,
      rules: [], //过滤规则
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.rows = val;
      this.page.page = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.getList(false);
    },
    close(isRefresh = false) {
      this.id = "";
      this.showUpdatePayAccount = false;
      if (isRefresh) this.getList();
    },
    handleAdd() {
      this.id = "";
      this.showUpdatePayAccount = true;
    },
    handleEdit(item) {
      this.id = item;
      this.showUpdatePayAccount = true;
    },
    async getList(isClear) {
      if (isClear) this.page.page = 1;
      const query = {
        ...this.page,
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.PayConfig.GetAlipayAccountList(query);
      console.log(res);
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
