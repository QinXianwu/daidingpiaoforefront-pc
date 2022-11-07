<template>
  <div class="view-container">
    <div class="content">
      <SearchForm
        isShowExport
        isShowExportPass
        isReturnFormData
        :formData="formData"
        @on-search="onSearch"
        @on-export="onExport"
        @on-exportPass="onExportPass"
      />
      <Orther />
      <div class="bulk-operations">
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
      <TablePanel
        ref="TablePanel"
        :tableData="list"
        :tableHead="column"
        :checkbox="false"
      >
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleAction(scope)">
              <span>退票审核</span>
            </el-button>
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
    <!-- 审核退票 -->
    <ReviewRefundTicket
      :editInfo="revireInfo"
      :show.sync="showReviewRefundTicket"
      @close="close"
    />
  </div>
</template>

<script>
import { column, formData } from "./config";
import Orther from "./components/Orther.vue";
import { DownloadFile } from "@/utils/index";
import ReviewRefundTicket from "./components/ReviewRefundTicket.vue";
export default {
  name: "NonReadyMoney",
  components: { Orther, ReviewRefundTicket },
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
      isLoading: false,
      isExporting: false,
      isExportingPass: false,
      revireInfo: {},
      showReviewRefundTicket: false,
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
    onSearch(data) {
      // console.log(data);
      this.query = { ...data };
      if (data?.trainDate?.length) {
        this.query.startTicketTime = data.trainDate[0];
        this.query.endTicketTime = data.trainDate[1];
      }
      delete this.query.trainDate;
      this.getList(true);
    },
    // 导出
    async onExport(data) {
      if (this.isExporting) return false;
      const query = { ...data };
      if (data?.trainDate?.length) {
        query.startTicketTime = data.trainDate[0];
        query.endTicketTime = data.trainDate[1];
      }
      delete query.trainDate;
      this.isExporting = true;
      const [, res] = await this.$http.ExportImport.ExportRefundTicketNonCash({
        size: -1,
        current: 1,
        paramData: { ...query },
      });
      this.isExporting = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({ data: res, fileName: "非现金退票" });
    },
    // 导出证件
    async onExportPass(data) {
      if (this.isExportingPass) return false;
      const query = { ...data };
      if (data?.trainDate?.length) {
        query.startTicketTime = data.trainDate[0];
        query.endTicketTime = data.trainDate[1];
      }
      delete query.trainDate;
      this.isExportingPass = true;
      const [, res] =
        await this.$http.ExportImport.ExportRefundTicketNonCashPass({
          size: -1,
          current: 1,
          paramData: { ...query },
        });
      this.isExportingPass = false;
      if (!res) return this.$message.error("导出失败");
      this.onExportDownloadFile({
        data: res,
        fileName: "非现金退票_导出证件",
        fileType: "application/zip;charset=UTF-8",
      });
    },
    async onExportDownloadFile({ data, fileName, fileType }) {
      if (!data) return;
      try {
        await this.$confirm("导出成功，是否进行下载？", "导出提示", {
          confirmButtonText: "去下载",
          cancelButtonText: "取消",
          type: "success",
        });
        const date = this.$options.filters.formatDate(
          Date.now(),
          "yyyy-MM-dd hh:mm:ss"
        );
        const dateType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";
        DownloadFile({
          data: data,
          FileName: `${fileName || ""}_${date}`,
          type: fileType || dateType,
        });
      } catch (e) {
        // e;
      }
    },
    // 导入
    onOneImport() {
      console.log("onOneImport");
    },
    // 无法购票
    onUnableBuyTickets() {
      console.log("onUnableBuyTickets");
    },
    handleAction(item) {
      this.showReviewRefundTicket = true;
      this.revireInfo = { ...item };
    },
    close() {
      this.showReviewRefundTicket = false;
      this.revireInfo = {};
    },
    async getList(isClear) {
      if (this.isLoading) return;
      if (isClear) this.page.current = 1;
      this.isLoading = true;
      const [, res] =
        await this.$http.OrderRefund.GetTicketingRefundNoNwCashList({
          ...this.page,
          paramData: { ...this.query },
        });
      this.isLoading = false;
      this.list = res?.list || [];
      this.total = res?.total || 0;
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
