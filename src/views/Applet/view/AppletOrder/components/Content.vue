<template>
  <div class="ContentView">
    <ActionView :agentCode="agentCode" :alipayAccount="alipayAccount" />
    <TicketDetails :ticketInfo="ticketInfo" />
    <TicketList :list="list" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ActionView from "./Action.vue";
import TicketList from "./TicketList.vue";
import TicketDetails from "./TicketDetails.vue";
import neworder from "assets/media/neworder.wav";
import timeout from "assets/media/timeout.wav";

export default {
  name: "ContentView",
  components: { ActionView, TicketDetails, TicketList },
  props: {
    agentCode: {
      type: String,
      default: "",
    },
  },
  watch: {
    agentCode(val) {
      // 清除旧定时器
      if (this.timeId) clearInterval(this.timeId);
      this.list = [];
      if (val) {
        this.getStatistics();
        this.getList(true);
      }
    },
  },
  data() {
    return {
      neworderAudio: new Audio(neworder), // 新订单提示
      timeoutAudio: new Audio(timeout), // 即将超时提示
      alipayAccount: "",
      ticketInfo: {},
      list: [],
      page: {
        current: 1,
        size: 1,
      },
      timeId: "",
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.authorization.state,
      isAudio: (state) => state.app.isAudio, // 是否开启声音
      userInfo: (state) => state.user.userInfo,
    }),
    receiveOrderLimit({ userInfo }) {
      return userInfo?.receiveOrderLimit || 1;
    },
  },
  methods: {
    // 获取代售点数据
    async getStatistics() {
      if (!this.agentCode) return;
      const [, res] = await this.$http.Order.GetOrderStatistics({
        agentCode: this.agentCode,
      });
      this.ticketInfo = res ? res : {};
    },
    async getList(isClear) {
      if (isClear) this.page.current = 1;
      const query = {
        ...this.page,
        size: this.receiveOrderLimit,
        paramData: { agentCode: this.agentCode },
      };
      const [, res] = await this.$http.Order.GetOrderWaitList(query);
      const idsStr = this.list.map((item) => item.id).join(",");
      const tempList = res?.list?.length ? res?.list : [];
      const joinList = tempList.filter((item) => !idsStr.includes(item.id));
      const tempArr = [].concat(this.list, joinList);
      if (tempArr?.length > this.list?.length) {
        // this.$message.success("你有一个新订单，请及时处理");
        this.$notify({
          title: "新订单",
          message: "你有一个新订单，请及时处理",
          type: "success",
          offset: 50,
        });
        if (this.isAudio) this.neworderAudio.play();
      }
      this.list = [...tempArr];
      this.total = res?.total || 0;
      this.$nextTick(() => {
        this.timeId = setTimeout(() => {
          if (this.token) this.getList(true);
          else if (this.timeId) clearInterval(this.timeId);
        }, 5000);
      });
    },
    // 过期删除
    onCountdownOver(val) {
      this.$nextTick(() => {
        setTimeout(() => {
          const index = this.list.findIndex((item) => item.id === val?.id);
          if (index >= 0) this.list.splice(index, 1);
        }, 200);
      });
    },
    // 即将超时处理提示
    onReminder() {
      // this.$message.error("你有一个订单即将超时，请及时处理");
      this.$notify({
        title: "订单即将超时",
        message: "你有一个订单即将超时，请及时处理",
        type: "error",
        offset: 50,
      });
      if (this.isAudio) this.timeoutAudio.play();
    },
  },
  beforeDestroy() {
    // 清除定时器
    if (this.timeId) clearInterval(this.timeId);
  },
};
</script>
<style lang="scss" scoped>
.ContentView {
  background: #f5f5f5;
}
</style>
