<template>
  <div class="BasicFacts">
    <!-- 常用功能 -->
    <Tool />
    <!-- 待办事项 -->
    <ToDoEvent />

    <!-- 数据统计 -->
    <Statistics />

    <!-- 订单汇总 -->
    <div class="orderTotal">
      <OrderTotalPrice />
      <OrderTotalNum />
    </div>

    <!-- 总奖励金额 -->
    <TotalReward />
  </div>
</template>

<script>
import Tool from "./components/Tool";
import ToDoEvent from "./components/ToDoEvent";
import Statistics from "./components/Statistics";
import OrderTotalPrice from "./components/OrderTotalPrice";
import OrderTotalNum from "./components/OrderTotalNum";
import TotalReward from "./components/TotalReward";
export default {
  components: {
    Tool,
    ToDoEvent,
    Statistics,
    OrderTotalPrice,
    OrderTotalNum,
    TotalReward,
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
