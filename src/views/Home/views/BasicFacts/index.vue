<template>
  <div class="view-container">
    <div>home</div>
    <EchartLine :chartsData="chartsData" />
  </div>
</template>

<script>
import EchartLine from "@/components/EchartLine/index.vue";
export default {
  components: { EchartLine },
  data() {
    return {
      chartsData: [
        { value: 20, name: "abc" },
        { value: 20, name: "aac" },
        { value: 20, name: "aec" },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
