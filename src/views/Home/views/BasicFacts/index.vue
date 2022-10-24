<template>
  <div class="view-container">
    <div>home</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {
    // 获取支付宝账号列表
    this.$store.dispatch("agent/GetAlipayAccountListAction");
  },
};
</script>

<style lang="scss" scoped></style>
