<template>
  <div class="view-container">
    <div class="content">
      <SearchForm
        isShowExport
        isReturnFormData
        :formData="queryFormData"
        :isShowExportList="false"
        @on-search="onSearch"
        @on-export="onExport"
      />
      <TicketDetails :ticketInfo="ticketInfo" />
      <TablePanel :tableData="list" :tableHead="column">
        <template #departTime="{ scope }">
          <span class="text-html">{{ scope.departTime }}</span>
        </template>
        <template #trainNumber="{ scope }">
          <span class="text-html">{{ scope.trainNumber }}</span>
        </template>
        <template #fromToStationName="{ scope }">
          <span class="text-html">{{ scope.fromToStationName }}</span>
        </template>
        <template #ticketCount="{ scope }">
          <span class="text-html">{{ scope.ticketCount }}</span>
        </template>
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
        :page-size="page.size"
        :current-page="page.current"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { column, formData } from "./config";
import { mapGetters } from "vuex";
import TicketDetails from "./components/TicketDetails.vue";
export default {
  name: "TicketsSearch",
  components: { TicketDetails },
  data() {
    return {
      formData,
      column, //表格头
      list: [],
      page: {
        current: 1,
        size: 10,
      },
      query: {},
      total: 0,
      ticketInfo: {},
    };
  },
  computed: {
    ...mapGetters({
      pointSaleOptions: "agent/pointSaleOptions",
    }),
    queryFormData({ formData, pointSaleOptions }) {
      const data = [...formData];
      const item = data.find((item) => item.prop === "agentCode");
      item.options = pointSaleOptions;
      return data;
    },
  },
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
    onSearch(data) {
      // console.log(data);
      this.getTicketingStatisticsInfo({ agentCode: data?.agentCode || "" });
      this.query = { ...data };
      if (data?.ticketDate?.length) {
        this.query.departStartTime = data.ticketDate[0];
        this.query.departEndTime = data.ticketDate[1];
      }
      delete this.query.ticketDate;
      this.getList(true);
    },
    // 导出
    async onExport() {
      if (this.isExporting) return false;
      this.isExporting = true;
      const res = true;
      // const [, res] = await this.$http.ExportImport.ExportWinExchange({
      //   ActCode: this.ActCode,
      //   ...this.searchQuery,
      // });
      this.isExporting = false;
      if (res) {
        try {
          await this.$confirm("导出成功，是否进行下载？", "导出提示", {
            confirmButtonText: "去下载",
            cancelButtonText: "取消",
            type: "success",
          });
          console.log("去下载");
          // 去下载
          // this.$router.push({ name: "ExportList" });
        } catch (e) {
          e;
        }
      }
    },
    customerService() {
      console.log("客服");
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      const [, res] = await this.$http.OrderQuery.GetTicketingList({
        ...this.page,
        paramData: { ...this.query },
      });
      this.list = res?.list || [];
      this.total = res?.total || 0;
    },
    async getTicketingStatisticsInfo({ agentCode }) {
      if (!agentCode) return (this.ticketInfo = {});
      const [, res] = await this.$http.OrderQuery.GetTicketingStatistics({
        agentCode,
      });
      this.ticketInfo = res ? res : {};
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
.text-html {
  white-space: pre-wrap;
}
</style>
