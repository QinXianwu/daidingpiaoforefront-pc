<template>
  <div class="TicketingEcharts">
    <div
      i="pieReport"
      ref="pieReport"
      :style="{
        width: `${width ? width : ''}px`,
        height: `${height ? height : ''}px`,
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "TicketingEcharts",
  props: {
    width: {
      type: Number,
      default: 650,
    },
    height: {
      type: Number,
      default: 220,
    },
    legend: {
      type: Object,
      default: () => ({
        orient: "vertical",
        left: "auto",
      }),
    },
    // 系列名称
    seriesName: {
      type: String,
      default: "系列名称",
    },
    // 提示框浮层内容格式器，支持字符串模板和回调函数
    tooltipFormatter: {
      type: String,
      default: "{a}<br/>{b}:{c} ({d}%)",
    },
    // 列表 label key
    opinionKey: {
      type: String,
      default: "name",
    },
    //自定义颜色
    colorList: {
      type: Array,
      default: () => [],
    },
    // 饼状图数据
    pieData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      charts: "",
    };
  },
  computed: {
    opinion({ opinionKey, pieData }) {
      if (!pieData?.length) return [];
      return pieData.map((item) => item[opinionKey || "name"]);
    },
  },
  methods: {
    initEcharts() {
      this.charts = this.$echarts.init(this.$refs.pieReport);
      this.drawCharts();
    },
    drawCharts() {
      const series = {
        // 系列名称，用于tooltip的显示，legend 的图例筛选
        name: this.seriesName,
        type: "pie",
        avoidLabelOverlap: false,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        data: this.pieData,
      };
      if (this.seriesName) series.name = this.seriesName;
      if (this.colorList?.length) {
        series.itemStyle.color = (params) => this.colorList[params.dataIndex];
      }
      this.charts.setOption({
        tooltip: {
          trigger: "item", // 数据项图形触发
          formatter: this.tooltipFormatter,
        },
        legend: {
          data: this.opinion,
          ...this.legend,
        },
        series: [series],
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initEcharts("pieReport");
    });
  },
};
</script>
<style lang="scss" scoped>
.TicketingEcharts {
  width: 600px;
  [i="pieReport"] {
    width: 650px;
    height: 220px;
  }
}
</style>
