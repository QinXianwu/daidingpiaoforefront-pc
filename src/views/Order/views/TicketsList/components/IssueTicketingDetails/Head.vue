<template>
  <div class="head-info">
    <span class="date">2022-10-01</span>
    <span class="car-num">G640 次</span>
    <span class="start-end">
      <span class="start">南昌(07:48:00)</span>
      <span class="end">武汉(10:26:00)</span>
    </span>
    <span class="seat-class ml-10">二等座</span>
    <span class="ticketing-num ml-10">1张</span>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.head-info {
  display: flex;
  flex-wrap: wrap;
  padding: 16px 24px;
  background: #f7f8fa;
  font-size: 18px;
  color: $main-font-color;
  border-bottom: 1px solid #eee;
  .date {
    margin-right: 32px;
  }
  .car-num {
    margin-right: 64px;
  }
  .start-end,
  .start {
    display: flex;
    align-items: center;
  }
  .start::after {
    content: "";
    display: block;
    width: 40px;
    height: 2px;
    background-color: $main-font-color;
    margin: 0 15px;
  }
}
</style>
