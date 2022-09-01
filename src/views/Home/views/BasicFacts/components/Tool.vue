<template>
  <div class="tool">
    <div class="title">常用功能</div>
    <div class="tool_list">
      <div
        class="tool_item"
        v-for="(item, index) in tool"
        :key="index"
        @click="jumpRouter(item.pushData)"
      >
        <div class="tool_img">
          <img :src="item.icon" />
        </div>
        <div class="tool_label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tool: [
        {
          label: "订单查询",
          icon: require("../images/order.png"),
          pushData: { name: "OrderList" },
        },
        {
          label: "订单发货",
          icon: require("../images/send.png"),
          pushData: { name: "SendOrderList" },
        },
        {
          label: "提现审核",
          icon: require("../images/withdrawal.png"),
          pushData: { name: "WithdrawReview" },
        },
        {
          label: "售后审核",
          icon: require("../images/after.png"),
          pushData: { name: "AfterSaleOrderList" },
        },
        {
          label: "商品管理",
          icon: require("../images/goods.png"),
          pushData: { name: "GoodsList" },
        },
        {
          label: "发布商品",
          icon: require("../images/add.png"),
          pushData: { name: "Edit" },
        },
        {
          label: "奖励管理",
          icon: require("../images/reward.png"),
          pushData: { name: "AwardManage" },
        },
        {
          label: "店铺装修",
          icon: require("../images/shop.png"),
          pushData: { name: "PageEditor" },
        },
      ],
    };
  },
  methods: {
    jumpRouter(data) {
      if (!data) return;
      this.$router.push(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.tool {
  background: #ffffff;
  padding: 14px 16px;
  margin-bottom: 16px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: $main-font-color;
    line-height: 22px;
    padding-bottom: 16px;
  }
  &_list {
    display: flex;
  }
  &_item {
    width: 180px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &_img {
    width: 40px;
    height: 40px;
    img {
      width: 36px;
      height: 36px;
    }
  }
  &_label {
    font-size: 14px;
    color: $main-font-color;
    line-height: 20px;
    margin-top: 9px;
  }
  &_item:hover {
    .tool_img {
      img {
        width: 40px;
        height: 40px;
      }
    }
    .tool_label {
      font-weight: bold;
    }
  }
}
</style>
