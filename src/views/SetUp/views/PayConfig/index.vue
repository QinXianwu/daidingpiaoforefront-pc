<template>
  <div class="view-container">
    <el-tabs tab-position="top" v-model="activeName">
      <el-tab-pane label="支付宝账号管理" name="AlibabaPay" />
    </el-tabs>
    <div class="content">
      <AlibabaPay v-if="activeName === 'AlibabaPay'" />
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
.view-container {
  background: #fff;
  .content {
    padding: 20px 0;
  }
}
</style>
