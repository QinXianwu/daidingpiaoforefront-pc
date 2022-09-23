<template>
  <div class="view-container">
    <div class="content">
      <SearchForm isReturnFormData :formData="formData" @on-search="onSearch" />
      <Orther />
      <div class="bulk-operations">
        <el-button type="primary" @click="onExportExcel">导出Excel</el-button>
        <el-button type="primary" @click="onExportCredential"
          >导出证件</el-button
        >
        <el-button type="primary" @click="onOneImport">一键导入</el-button>
        <span class="ml-10">
          <el-button type="primary" @click="onUnableBuyTickets"
            >无法购票</el-button
          >
          <el-tooltip
            effect="dark"
            content="若遇到紧急情况无法退票，可先勾选车票，再点击无法退票按钮进行操作"
            placement="right"
          >
            <span>
              <i class="el-icon-question ml-10"></i>
            </span>
          </el-tooltip>
        </span>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <!-- 操作 -->
        <template #action="{}">
          <div class="action-groud">
            <el-button type="text" @click="customerService"> 客服 </el-button>
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
  </div>
</template>

<script>
import { column, formData } from "./config";
import Orther from "./components/Orther.vue";
export default {
  name: "ReadyMoney",
  components: { Orther },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      page: {
        rows: 10,
        page: 1,
      },
      total: 0,
      rules: [], //过滤规则
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.rows = val;
      this.page.page = 1;
      // this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.page = val;
      // this.getList(false);
    },
    onSearch(data) {
      console.log(data);
      this.rules = {};
      // this.getList(true);
    },
    onExportExcel() {
      console.log("onExportExcel");
    },
    onExportCredential() {
      console.log("onExportCredential");
    },
    onOneImport() {
      console.log("onOneImport");
    },
    onUnableBuyTickets() {
      console.log("onUnableBuyTickets");
    },
    customerService() {
      console.log("客服");
    },
    async getList(isClear) {
      if (isClear) this.page.page = 1;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background-color: #fff;
}
.bulk-operations {
  padding: 10px 0;
}
</style>
