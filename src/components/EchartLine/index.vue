<template>
  <div id="main" style="width: 100%; height: 600px" ref="main"></div>
</template>

<script>
// import axios from "axios";
export default {
  name: "homePage",
  mounted() {
    this.test();
  },
  methods: {
    test() {
      // 官方示例 var myChart = echarts.init(document.getElementById('main'));
      const myChart = this.$echarts.init(this.$refs.main); // 我们可以这样写
      //配置项，可以去查一下官方文档
      let options = {
        title: {
          text: "动态",
          textStyle: {
            color: "black",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        legend: {},
        xAxis: {
          type: "category",
          data: [
            "2021-10-1",
            "2021-10-2",
            "2021-10-3",
            "2021-10-4",
            "2021-10-5",
          ], // 把时间组成的数组接过来，放在x轴上
          boundaryGap: true,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [200, 100, 500, 600, 400],
            type: "line",
            name: "测试一",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            data: [110, 300, 550, 400, 800],
            name: "测试二",
            type: "line",
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      };
      // setInterval(function () {
      //   let nowTime = new Date().toLocaleTimeString().replace(/^\D*/, "");
      //   time.shift();
      //   time.push(nowTime);
      //   dataOne.shift();
      //   dataOne.push(Math.round(Math.random() * 1000));
      //   dataTwo.shift();
      //   dataTwo.push(Math.round(Math.random() * 1000));
      //   console.log(dataOne);
      //   //很多朋友可能要接后端接口,把数据替换下来既可以了
      //   // axios.get('你的url').then(res => {
      //   //   console.log(res)
      //   // })
      //   myChart.setOption({
      //     xAxis: [
      //       {
      //         data: time,
      //       },
      //     ],
      //     series: [
      //       {
      //         data: dataOne,
      //       },
      //       {
      //         data: dataTwo,
      //       },
      //     ],
      //   });
      // }, 2000);
      myChart.setOption(options);
    },
  },
};
</script>

<style scoped lang="scss"></style>
