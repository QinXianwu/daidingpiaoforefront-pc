<template>
  <div class="view-container">
    <div>home</div>
    <EchartLine
      ref="EchartLine"
      chartTitle="折线图"
      :chartsData="chartsData"
      :chartsXAxisData="chartsXAxisData"
    />
  </div>
</template>

<script>
import EchartLine from "@/components/EchartLine/index";
export default {
  components: { EchartLine },
  data() {
    return {
      chartsData: [
        {
          data: [80, 550, 100, 256, 720, 499],
          name: "测试一",
          showXMarkPoint: false, // 组件默认 true
          showYMarkLine: false, // 组件默认 true
          isSmooth: false, // 组件默认 false
        },
        {
          data: [150, 240, 200, 856, 800, 599],
          name: "测试二",
        },
      ],
      // x轴数据
      chartsXAxisData: [
        "2022/10/1",
        "2022/10/2",
        "2022-10-3",
        "2022-10-4",
        "2022-10-5",
        "2022-10-6",
      ],
    };
  },
  computed: {},
  methods: {},
  mounted() {
    //
  },
};
</script>

<style lang="scss" scoped></style>
