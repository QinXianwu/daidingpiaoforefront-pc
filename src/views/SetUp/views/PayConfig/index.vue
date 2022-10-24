<template>
  <div class="container-wrap">
    <div class="container">
      <el-tabs tab-position="top" v-model="activeName">
        <el-tab-pane label="支付宝账号管理" name="AlibabaPay">
          <AlibabaPay />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AlibabaPay from "./components/AlibabaPay/index.vue";
export default {
  name: "PayConfig",
  components: {
    AlibabaPay,
  },
  data() {
    return {
      activeName: "AlibabaPay",
    };
  },
  computed: {},
  watch: {},
};
</script>

<style lang="scss" scoped>
.container-wrap {
  padding: 20px 20px;
  background: #f7f8fa;
}
.container {
  padding: 26px 30px;
  background: #ffffff;
  ::v-deep .input-medium {
    width: 380px;
  }
}
</style>
