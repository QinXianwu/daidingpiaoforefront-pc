<template>
  <div class="TicketingEcharts">
    <div i="pieReport" ref="pieReport"></div>
  </div>
</template>

<script>
export default {
  name: "TicketingEcharts",
  components: {},
  data() {
    return {
      charts: "",
      opinion: [
        "及格人数",
        "未及格人数",
        "未及格人数1",
        "未及格人数2",
        "未及格人数3",
        "未及格人数4",
        "未及格人数5",
      ],
      opinionData: [
        { value: 12, name: "及格人数" },
        { value: 18, name: "未及格人数" },
        { value: 18, name: "未及格人数1" },
        { value: 18, name: "未及格人数2" },
        { value: 18, name: "未及格人数3" },
        { value: 18, name: "未及格人数4" },
        { value: 18, name: "未及格人数5" },
      ],
    };
  },
  computed: {},
  methods: {
    initEcharts() {
      this.charts = this.$echarts.init(this.$refs.pieReport);
      this.drawCharts();
    },
    drawCharts() {
      this.charts.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          bottom: 5,
          left: "left",
          data: this.opinion,
        },
        series: [
          {
            name: "状态",
            type: "pie",
            avoidLabelOverlap: false,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              // color(params) {
              //   //自定义颜色
              //   // var colorList = ["#1ab394", "#79d2c0"];
              //   const colorList = [
              //     "#288AFE",
              //     "#52CCA3",
              //     "#9580FF",
              //     "#F2C051",
              //     "#7D8FB3",
              //     "#F9821C",
              //   ];
              //   return colorList[params.dataIndex];
              // },
            },
            data: this.opinionData,
          },
        ],
      });
      // this.charts.setOption({
      //   legend: {
      //     orient: "vertical",
      //     left: "left",
      //     data: ["Apple", "Grapes", "Pineapples", "Oranges", "Bananas"],
      //   },
      //   series: [
      //     {
      //       type: "pie",
      //       data: [
      //         {
      //           value: 335,
      //           name: "Apple",
      //         },
      //         {
      //           value: 310,
      //           name: "Grapes",
      //         },
      //         {
      //           value: 234,
      //           name: "Pineapples",
      //         },
      //         {
      //           value: 135,
      //           name: "Oranges",
      //         },
      //         {
      //           value: 1548,
      //           name: "Bananas",
      //         },
      //       ],
      //     },
      //   ],
      // });
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
[i="pieReport"] {
  width: 400px;
  height: 300px;
}
</style>
