<template>
  <div class="BasicFacts">
    <div>home</div>
    <el-button type="primary" @click="setLockOrder">锁单</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  methods: {
    async setLockOrder() {
      const res = await this.$http.LockOrder.LockOrder();
      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped>
.BasicFacts {
  padding: 20px;
}
.orderTotal {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  > div {
    width: 47.6%;
  }
}
</style>
