<template>
  <div class="ToDoEvent">
    <div class="ToDoEvent_title">待办事项</div>
    <div class="ToDoEvent_list">
      <div
        class="ToDoEvent_item"
        v-for="(item, index) in list"
        :key="index"
        @click="handleJump(item.route)"
      >
        <div class="ToDoEvent_value">{{ item.value }}</div>
        <div class="ToDoEvent_label">
          <span>{{ item.label }}</span>
          <el-tooltip
            v-if="item.tip"
            effect="light"
            :content="item.tip"
            placement="bottom"
          >
            <i class="ToDoEvent_icon el-icon-question"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    todoData() {
      return this.$store.state.home.todoData;
    },
    list({ todoData }) {
      return [
        {
          label: "待配送订单(笔)",
          prop: "delivered",
          value: todoData.delivered || 0,
          tip: "统计状态为未拣货、拣货中的待配送订单数据",
          route: {
            name: "SendOrderList",
          },
        },
        {
          label: "提现审核(笔)",
          prop: "Withdrawal",
          value: todoData.Withdrawal || 0,
          tip: "统计提现处理中的提现订单数据",
          route: {
            name: "WithdrawReview",
          },
        },
        {
          label: "售后订单(笔)",
          prop: "Aftersales",
          value: todoData.Aftersales || 0,
          tip: "统计售后处理中的售后订单数据",
          route: {
            name: "AfterSaleOrderList",
          },
        },
        {
          label: "经销商审核(个)",
          prop: "Dealeraudit",
          value: todoData.Dealeraudit || 0,
          tip: "统计授权订单状态为待审核的授权订单数据",
          route: {
            name: "OrderList",
          },
        },
      ];
    },
  },
  methods: {
    async getInfo() {
      const [, res] = await this.$http.Data.StatisticsReport2();
      if (res?.Result?.length) {
        this.$store.commit("home/SET_TODO_DATA", res?.Result[0] || {});
      }
    },
    handleJump(route) {
      if (route && (route.name || route.path)) {
        this.$router.push(route);
      }
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>
.ToDoEvent {
  background: #ffffff;
  padding: 14px 16px;
  margin-bottom: 16px;
  &_title {
    font-size: 16px;
    font-weight: bold;
    color: $main-font-color;
    line-height: 22px;
    padding-bottom: 16px;
  }
  &_list {
    display: flex;
    justify-content: space-around;
    padding: 20px 20px 60px;
  }
  &_item {
    width: 200px;
    text-align: center;
    padding: 0 20px;
    box-sizing: border-box;
    cursor: pointer;
  }
  &_value {
    font-size: 28px;
    font-weight: bold;
    color: $main-font-color;
    line-height: 40px;
  }
  &_label {
    font-size: 14px;
    color: $main-font-color;
    line-height: 20px;
  }
  &_icon {
    color: $sub-font-color;
    padding-left: 6px;
    color: #cccccc;
  }
}
</style>
