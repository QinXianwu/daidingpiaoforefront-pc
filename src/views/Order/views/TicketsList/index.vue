<template>
  <div class="view-container">
    <div class="content">
      <SearchForm
        :formData="formData"
        @on-search="onSearch"
        @on-export="onExport"
      >
      </SearchForm>
      <TablePanel :tableData="list" :tableHead="column">
        <!-- <template #channel="record">
          {{
            record.scope.agent &&
            record.scope.agent.channel &&
            record.scope.agent.channel.name
          }}
        </template> -->
        <!-- 操作 -->
        <template>
          <div class="action-groud">
            <el-button type="text"> 修改 </el-button>
            <el-button type="text"> 详情 </el-button>
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
import { formData, column } from "./config";

export default {
  name: "TicketsList",
  components: {},
  data() {
    return {
      formData, //搜索项
      column, //表格头
      list: [],
      order: "user_id desc",
      page: {
        rows: 10,
        page: 1,
      },
      total: 0,
      rules: [], //过滤规则
    };
  },
  computed: {},
  created() {
    console.log(this.$route.query);
  },
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
      this.page.page = 1;
      this.rules = data;
      // this.getList(true);
    },
    //导出文件
    async onExport(options) {
      console.log(options);
      // const [, res] = await this.$http.ExportImport.ExecAgentExportList(
      //   {
      //     fileType: "xls",
      //     order: "user_id desc",
      //     filters: {
      //       rules: options,
      //     },
      //   },
      //   ""
      // );
      // this.isExporting = false;
      // if (res) {
      //   try {
      //     await this.$confirm(
      //       "导出成功，是否跳转到导出列表进行下载？",
      //       "导出提示",
      //       {
      //         confirmButtonText: "去下载",
      //         cancelButtonText: "稍后下载",
      //         type: "success",
      //       }
      //     );
      //     this.$router.push({ name: "ExportList" });
      //   } catch (e) {
      //     e;
      //   }
      // }
    },

    async getList(isClear) {
      if (isClear) this.page.page = 1;
      // let query = {
      //   ...this.page,
      //   order: this.order || "user_id desc",
      // };
      // if (this.rules.length) query.filters = { rules: this.rules };
      // const [, res] = await this.$http.Agent.GetList(query);
      // console.log(res.users);
      // this.list = res?.users || [];
      // this.total = res.Attr.RecordCount;
      // this.config_moneys = res.config_moneys;
    },
  },
};
</script>
<style lang="scss" scoped>
.view-container {
  background-color: #fff;
}
</style>
