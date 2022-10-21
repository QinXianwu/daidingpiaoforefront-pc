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
        <TablePanel :tableData="list" :tableHead="column" expand isExpandAll>
          <!-- 发车时间 -->
          <template #departure_time="{ scope }">
            <p v-for="(item, index) in scope.ticketList || [{}]" :key="index">
              <span>{{ item["departTime"] || "-" }}</span>
            </p>
          </template>
          <!-- 车次 -->
          <template #trips_number="{ scope }">
            <p v-for="(item, index) in scope.ticketList || [{}]" :key="index">
              <span>{{ item["trainNumber"] || "-" }}</span>
            </p>
          </template>
          <!-- 发/到站 -->
          <template #start_end_station="{ scope }">
            <p v-for="(item, index) in scope.ticketList || [{}]" :key="index">
              <span> {{ item["fromStationName"] || "-" }} </span>
              <span>{{ " - " }}</span>
              <span> {{ item["toStationName"] || "-" }} </span>
            </p>
          </template>
          <!-- 订单标记 -->
          <template #order_mark="{ scope }">
            {{ $CONST.ORDER_FLAG_TEXT[scope.orderFlag] || "无" }}
          </template>

          <!-- 处理时间倒计时 -->
          <template #process_countdown="{ scope }">
            <TimeDown
              :showH="false"
              :targerTime="scope.expireTime"
              @on-change="onCountdownOver(scope)"
            />
          </template>
          <!-- 展开行-出票详情 -->
          <template #expand="{ scope }">
            <IssueTicketingDetails
              :ticketingList="scope.ticketList"
              v-if="scope.ticketList && scope.ticketList.length"
            />
            <div class="nothing-ticketing">暂无数据</div>
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
        :pageSizes="[page.size, 10, 20, 50, 100]"
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
        size: 2,
        current: 20,
      },
      query: {
        agentCode: "000001064",
        lastId: "",
      },
      total: 0,
      alipayAccount: "", // 支付宝账号
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
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.Order.GetOrderWaitList(query);
      if (!res?.list?.length) return;
      this.list = res.list;
      this.total = res?.total || 0;
      this.$nextTick(() => {
        setTimeout(() => {
          this.list.push(this.list[0]);
        }, 5000);
      });
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
  .nothing-ticketing {
    padding: 10px 0;
    text-align: center;
    color: $tip-font-color;
  }
}
</style>
