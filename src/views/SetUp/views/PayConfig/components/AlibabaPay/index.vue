<template>
  <div class="content">
    <div class="action">
      <el-button type="primary"> 新增账号 </el-button>
    </div>
    <TablePanel :tableData="list" :tableHead="column">
      <!-- 操作 -->
      <template #action="{}">
        <div class="action-groud">
          <el-button type="text"> 编辑 </el-button>
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
  </div>
</template>

<script>
import { column } from "./config";
export default {
  name: "AlibabaPay",
  components: {},
  data() {
    return {
      column, //表格头
      list: [],
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
.bulk-operations {
  padding: 10px 0;
}
.action {
  padding: 10px 0;
}
.batch {
  padding: 10px 0;
}
</style>
