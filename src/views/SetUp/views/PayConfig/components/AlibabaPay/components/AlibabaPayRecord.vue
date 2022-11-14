<template>
  <div class="AlibabaPayRecord">
    <div class="footer">
      <el-button type="primary" @click="$emit('close')"> 返回 </el-button>
    </div>
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="AlibabaPayFormData"
        @on-search="onSearch"
      />
      <TablePanel :tableData="list" :tableHead="AlibabaPayColumn">
        <!-- 操作 -->
      </TablePanel>
    </div>
    <!-- 分页 -->
    <!-- <Pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="page.size"
      :current-page="page.current"
      :total="total"
    /> -->
  </div>
</template>

<script>
import { AlibabaPayFormData, AlibabaPayColumn } from "../config/index";
export default {
  name: "AlibabaPayRecord",
  components: {},
  props: {
    accountDetail: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  data() {
    return {
      AlibabaPayFormData,
      AlibabaPayColumn,
      list: [],
      page: {
        size: 10,
        current: 1,
      },
      query: {},
      total: 0,
    };
  },
  computed: {},
  methods: {
    init() {
      const curDate = this.$options.filters.formatDate(new Date());
      this.query = {
        startTime: `${curDate} 00:00:00`,
      };
      this.getList();
    },
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
      this.query = { ...data };
      if (data?.payDate?.length) {
        if (data.payDate[0]) this.query.startTime = data.payDate[0];
        if (data.payDate[1]) this.query.endTime = data.payDate[1];
      }
      delete this.query.payDate;
      this.getList(true);
    },
    async getList(isClear) {
      if (!this.accountDetail?.id) return;
      if (isClear) this.page.current = 1;
      const [, res] = await this.$http.PayConfig.GetAlipayAccountRecordList({
        id: this.accountDetail.id,
        ...this.query,
      });
      this.list = res?.alipayRecordList || [];
    },
  },
  mounted() {
    if (this.accountDetail?.id) this.init();
  },
};
</script>
<style lang="scss" scoped>
.footer {
  padding: 10px 0 20px;
}
</style>
