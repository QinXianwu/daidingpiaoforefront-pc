<template>
  <div class="view-container">
    <div class="content">
      <HeadContent :alipayAccount.sync="alipayAccount" />
      <TicketDetails />

      <div class="ticketing">
        <div class="title">
          <span class="mr-10">出票明细</span>
          <span class="tip"
            >[允许出票证件包括：港内、台内、外留、二代、护照]</span
          >
        </div>
        <TablePanel :tableData="list" :tableHead="column" expand>
          <!-- 处理时间倒计时 -->
          <template #process_countdown="{ scope }">
            <TimeDown
              :showH="false"
              :targerTime="scope.process_countdown"
              @on-change="onCountdownOver(scope)"
            />
          </template>
          <!-- 展开行-出票详情 -->
          <template #expand="{ scope }">
            <IssueTicketingDetails :orderInfo="scope" />
          </template>
          <!-- 操作 -->
          <template #action="{}">
            <div class="action-groud">
              <el-button type="text" @click="sendMessage"> 发送通知 </el-button>
            </div>
          </template>
        </TablePanel>
      </div>

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
import { column } from "./config";
import TimeDown from "@/components/TimeDown/index";
import HeadContent from "./components/HeadContent.vue";
import TicketDetails from "./components/TicketDetails.vue";
import IssueTicketingDetails from "./components/IssueTicketingDetails/index";
export default {
  name: "TicketsList",
  components: { HeadContent, TicketDetails, TimeDown, IssueTicketingDetails },
  data() {
    return {
      column, //表格头
      list: [],
      page: {
        size: 10,
        current: 1,
      },
      total: 0,
      alipayAccount: "", // 支付宝账号
      rules: [], //过滤规则
    };
  },
  watch: {
    alipayAccount(val) {
      console.log(val);
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
    sendMessage() {
      console.log("sendMessage");
    },
    onCountdownOver(val) {
      console.log("onCountdownOver", val);
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      let query = {
        ...this.page,
      };
      if (this.rules.length) query.filters = { rules: this.rules };
      // const [, res] = await this.$http.Order.GetOrderWaitList(query);
      // console.log(res);
      // this.list = res?.users || [];
      this.list = [
        {
          order_code: "todo 1",
          departure_time: "todo",
          trips_number: "todo",
          start_end_station: "todo",
          order_mark: "todo",
          process_countdown: Date.now() + 1000 * 5,
          order_time: "todo",
        },
        {
          order_code: "todo 2",
          departure_time: "todo",
          trips_number: "todo",
          start_end_station: "todo",
          order_mark: "todo",
          process_countdown: Date.now() + 1000 * 60 * 10,
          order_time: "todo",
        },
      ];
      // this.total = res.Attr.RecordCount;
      // this.config_moneys = res.config_moneys;
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
.ticketing {
  margin: 20px 0 0;
  .title {
    height: 20px;
    margin: 20px;
    font-size: 14px;
    font-weight: 700;
    color: #282828;
    line-height: 20px;
    .tip {
      color: $--color-success;
    }
  }
}
</style>
