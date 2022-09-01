<template>
  <!-- 总奖励金额 -->
  <div class="totalReward">
    <div class="totalReward-label">订单总额(元)</div>
    <div v-if="totalData">
      <span class="totalReward-value">
        {{ totalData.SumMoney | formatCurrency }}
      </span>
      <span class="totalReward-tip" v-if="showText"
        >{{ showText }} {{ totalData.PercentageMoney }}<i :class="isUp"></i
      ></span>
    </div>
    <div>
      <PriceBlock
        v-for="(v, i) in showOrderList"
        :key="i"
        :title="`${v.Name}(元)`"
        :value="v.SumMoney"
        :compare="v.PercentageMoney"
      />
    </div>
    <div
      id="OrderTotalPrice"
      :style="{ width: '100%', height: '400px', marginTop: '20px' }"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PriceBlock from "./PriceBlock";
export default {
  components: {
    PriceBlock,
  },
  data() {
    return {
      labelList: [
        {
          label: "零售订单",
          key: "RetailMoney",
        },
        {
          label: "补货订单",
          key: "ReplenishmentMoney",
        },
        {
          label: "授权订单",
          key: "AuthorizationMoney",
        },
        {
          label: "提货订单",
          key: "GoodsMoney",
        },
        {
          label: "置换订单",
          key: "SubstitutionMoney",
        },
      ],
      chart: null,
    };
  },
  computed: {
    ...mapGetters({
      showText: "home/showText",
    }),
    orderList() {
      return this.$store.state.home.orderList;
    },
    totalData({ orderList }) {
      return orderList.find((v) => v.Name === "总计");
    },
    showOrderList({ orderList }) {
      return orderList.filter((v) => v.Name !== "总计");
    },
    isUp({ totalData }) {
      if (!totalData?.PercentageMoney) {
        return "";
      }
      const num = totalData.PercentageMoney.replace("%", "");
      if (Number(num) === 0) {
        return "";
      }
      if (Number(num) > 0) {
        return "top-icon el-icon-caret-top";
      } else {
        return "bottom-icon el-icon-caret-bottom";
      }
    },
    // 图表数据
    graphical_list() {
      return this.$store.state.home.graphical_list;
    },
  },
  watch: {
    graphical_list() {
      this.drawLine();
    },
  },
  methods: {
    drawLine() {
      if (!this.chart) {
        this.chart = this.$echarts.init(
          document.getElementById("OrderTotalPrice")
        );
      }
      const { xAxisData, series, xAxis } = this.getChartData();
      // 绘制图表
      this.chart.setOption({
        legend: {
          data: xAxis,
          x: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: { type: "category", name: "", data: xAxisData },
        yAxis: {},
        series: series,
      });
    },
    // 获取图表数据
    getChartData() {
      let xAxisData = [];
      let xAxis = [];
      let obj = {};
      // 虚拟数据
      this.labelList.forEach((li) => {
        obj[li.key] = [];
      });
      this.graphical_list.forEach((element) => {
        xAxisData.push(element.Xaxis);
        xAxis.push(element.label);
        for (const key in obj) {
          obj[key].push(element[key]);
        }
      });
      let series = this.labelList.map((item) => {
        return {
          name: item.label,
          type: "line",
          data: obj[item.key],
          smooth: true, // 是否平滑曲线
        };
      });
      return { xAxis, xAxisData, series };
    },
  },
};
</script>

<style lang="scss" scoped>
.totalReward {
  background: #ffffff;
  padding: 20px 16px;
  &-label {
    font-size: 14px;
    color: $sub-font-color;
    line-height: 20px;
    margin-bottom: 8px;
  }
  &-value {
    font-size: 28px;
    font-weight: bold;
    color: $main-font-color;
    line-height: 40px;
  }
  &-tip {
    font-size: 12px;
    color: $main-font-color;
    line-height: 17px;
  }
  .top-icon {
    color: #f23030;
  }
  .bottom-icon {
    color: #32b12e;
  }
}
</style>
