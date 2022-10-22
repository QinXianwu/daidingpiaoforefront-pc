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
    //
    this.$store.dispatch("agent/GetPointSaleListAction");
  },
};
</script>

<style lang="scss" scoped></style>
