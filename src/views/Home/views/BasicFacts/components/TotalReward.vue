<template>
  <!-- 总奖励金额 -->
  <div class="totalReward">
    <div class="totalReward-label">总奖励金额(元)</div>
    <div>
      <span class="totalReward-value">
        {{ ((total_data && total_data.SumMoney) || 0) | formatCurrency }}
      </span>
      <span class="totalReward-tip" v-if="showText"
        >{{ showText }} {{ total_data.PercentageSumMoney || "0.00%"
        }}<i :class="isUp"></i
      ></span>
    </div>
    <div class="PriceBlock-box">
      <PriceBlock
        title="卖货本金(元)"
        :value="total_data.PrincipalMoney"
        :compare="total_data.PercentagePrincipalMoney"
      />
      <PriceBlock
        title="佣金奖励(元)"
        :value="total_data.RewardMoney"
        :compare="total_data.PercentageRewardMoney"
      />
    </div>
    <div id="TotalReward" :style="{ width: '100%', height: '400px' }"></div>
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
      chart: null,
      labelList: [
        {
          label: "卖货本金",
          key: "PrincipalMoney",
        },
        {
          label: "佣金奖励",
          key: "RewardMoney",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      showText: "home/showText",
    }),
    total_data() {
      return this.$store.state.home.moneyStatistics_data;
    },
    isUp({ total_data }) {
      if (!total_data?.PercentageSumMoney) {
        return "";
      }
      const num = total_data.PercentageSumMoney.replace("%", "");
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
      this.chart = this.$echarts.init(document.getElementById("TotalReward"));

      const { xAxisData, series, xAxis } = this.getChartData();
      // 绘制图表
      this.chart.setOption({
        color: ["#62DAAB", "#6395F9"],
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
        xAxis: { name: "", data: xAxisData },
        yAxis: {},
        series,
      });
    },
    // 获取图表数据
    getChartData() {
      let xAxisData = [];
      let xAxis = [];
      let obj = {};
      const emphasisStyle = {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0,0,0,0.3)",
        },
      };
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
          type: "bar",
          stack: "one",
          emphasis: emphasisStyle,
          data: obj[item.key],
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
