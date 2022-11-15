<template>
  <div class="view-container">
    <div class="hello">
      <div class="title">{{ title }}</div>
    </div>
    <div class="statistic">
      <PriceBlock title="每天出票量" :value="ticketsDayNumber" />
    </div>
    <!-- 订单统计 -->
    <OrderStatistic :statisticInfo="statisticInfo" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import PriceBlock from "./components/PriceBlock";
import OrderStatistic from "./components/OrderStatistic";
export default {
  components: { PriceBlock, OrderStatistic },
  data() {
    return {
      statisticInfo: {},
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    mainAccountId({ userInfo }) {
      return userInfo?.account || "";
    },
    title({ mainAccountId }) {
      return `欢迎回来！${mainAccountId}`;
    },
    ticketsDayNumber({ statisticInfo }) {
      return statisticInfo?.ticketingCountEveryDay || "-";
    },
  },
  methods: {
    async getStatisticData() {
      const [, res] = await this.$http.Base.GetHomeOverview();
      this.statisticInfo = res || {};
    },
  },
  mounted() {
    this.getStatisticData();
  },
};
</script>

<style lang="scss" scoped>
.view-container {
  background-color: #fff;
}
.title {
  font-size: 18px;
  padding: 0 0 20px;
}
.statistic {
  padding: 0 10px 20px;
  margin: 0 0 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
</style>
