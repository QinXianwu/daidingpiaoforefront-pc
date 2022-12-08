<template>
  <div class="TicketList">
    <div class="title">
      <span>订票列表</span>
    </div>
    <div class="content">
      <el-collapse
        v-if="isRefresh && list && list.length"
        v-model="activeNames"
      >
        <el-collapse-item
          v-for="(item, index) in list"
          :key="index"
          :name="index"
        >
          <template slot="title">
            <div class="list-item">
              <div class="title">
                <span>出票明细{{ index + 1 }}</span>
                <i
                  class="el-icon-arrow-left icon"
                  :class="{ iconActive: activeNames.includes(index) }"
                ></i>
              </div>
              <div class="ticket-info">
                <span class="order-data">{{ item.createTime }}</span>
                <TimeDown
                  :reminderTime="120"
                  :targerTime="item.expireTime"
                  @on-reminder="$emit('onReminder')"
                  @on-change="$emit('onCountdownOver', item)"
                />
              </div>
              <div class="ticket-info-list">
                <!-- 出票头部信息 -->
                <TicketInfoList
                  :ticketList="item.ticketList"
                  v-if="item.ticketList && item.ticketList.length"
                />
              </div>
            </div>
            <transition name="plus-icon">
              <div class="action-bottom" v-if="!activeNames.includes(index)">
                <el-button
                  class="error-btn"
                  @click.stop.native="onSubmit({ index, action: true })"
                  >无票</el-button
                >
                <el-button
                  type="primary"
                  @click.stop.native="onSubmit({ index, action: true })"
                  >有票</el-button
                >
              </div>
            </transition>
            <div class="dividing-line" v-if="!activeNames.includes(index)" />
          </template>
          <div class="form-data">
            <TicketFormList
              :ref="`TicketFormList`"
              :orderInfo="item"
              :alipayAccount="alipayAccount"
              :ticketList="item.ticketList"
              :eorderNumber="eorderNumber"
              :payTradeInfo="payTradeInfo"
              @success="(val) => $emit('success', val)"
            />
            <OrderInfo
              :orderInfo="item"
              :amount="getTicketTotalAmount(index)"
              :alipayAccount="alipayAccount"
              :eorderNumber.sync="eorderNumber"
              :payTradeInfo.sync="payTradeInfo"
            />
            <div class="action-bottom">
              <el-button
                class="error-btn"
                @click.stop.native="onSubmit({ index, action: false })"
                >无票</el-button
              >
              <el-button
                type="primary"
                @click.stop.native="onSubmit({ index, action: true })"
                >有票</el-button
              >
            </div>
            <div class="dividing-line" />
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="nothing" v-else>
        <div class="nothing-img">
          <img :src="something" alt="" />
        </div>
        <span class="nothing-text">空空如也</span>
      </div>
    </div>
  </div>
</template>

<script>
import something from "../../images/something.png";
import OrderInfo from "./OrderInfo.vue";
import TicketInfoList from "./TicketInfoList.vue";
import TicketFormList from "./TicketFormList.vue";
import TimeDown from "@/components/TimeDown/index";

export default {
  name: "TicketList",
  components: { TimeDown, OrderInfo, TicketInfoList, TicketFormList },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    alipayAccount: {
      type: String,
      default: "",
    },
    isRefresh: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      something,
      activeNames: [],
      eorderNumber: "", // 电子订单号
      payTradeInfo: {}, // 支付流水号信息
    };
  },
  watch: {
    isRefresh(val) {
      console.log(val);
    },
  },
  computed: {},
  methods: {
    onSubmit(data) {
      // console.log(data, this.$refs[`TicketFormList`]);
      this.$refs[`TicketFormList`][data.index].onSubmit(data.action);
    },
    getTicketTotalAmount(index) {
      return this.list?.length && this.$refs[`TicketFormList`]?.length
        ? this.$refs[`TicketFormList`][index].getTicketTotalAmount()
        : 0;
    },
  },
  mounted() {
    console.log("TicketList");
  },
};
</script>
<style lang="scss" scoped>
.TicketList {
  .title {
    height: 24px;
    font-size: 15px;
    font-weight: 700;
    color: $main-font-color;
    line-height: 20px;
    margin-bottom: 8px;
    padding: 0 20px 0;
  }
  .content {
    padding: 10px 0 10px;
    background: #fff;
    .title {
      display: flex;
      justify-content: space-between;
      height: 22px;
      padding: 0;
    }
    .icon {
      transition: all 0.3s;
    }
    .iconActive {
      transform: rotate(-90deg);
    }
  }
  .ticket-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .order-data {
      color: $sub-font-color;
      font-size: 15px;
    }
  }
  .list-item {
    padding: 0 20px;
  }
  .nothing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0 20px;
    &-img {
      width: 120px;
      height: 120px;
    }
    &-img img {
      width: 100%;
      height: 100%;
    }
    &-text {
      color: $--color-info;
      font-size: 14px;
      padding: 10px 0;
    }
  }
  .action-bottom {
    display: flex;
    justify-content: center;
    padding: 10px 20px;
    color: #fff;
    transition: all 0.3s;
    .error-btn {
      background: #fe765c;
    }
    button {
      width: 50%;
      color: #fff;
      padding: 15px;
      border-radius: 6px;
      border: none;
    }
  }
  .dividing-line {
    width: 100%;
    height: 10px;
    background: #f5f5f5;
    margin: 10px 0;
  }
  ::v-deep .el-collapse-item__header {
    border: none;
    height: auto;
    display: block;
    -webkit-tap-highlight-color: transparent !important;
  }
  ::v-deep .el-collapse-item__arrow.el-icon-arrow-right {
    opacity: 0;
    display: none;
  }
  ::v-deep .el-collapse-item__content {
    padding-top: 0;
    padding-bottom: 0;
  }
  ::v-deep .el-collapse,
  ::v-deep .el-collapse-item__wrap {
    border: none;
  }
  ::v-deep .el-collapse-item {
    padding-bottom: 10px;
  }
  .plus-icon-enter-active {
    transition: opacity 0.3s;
  }
  .plus-icon-enter {
    opacity: 0;
  }
  .plus-icon-leave-active {
    transition: opacity 0.3s;
  }
  .plus-icon-leave-to {
    opacity: 0;
  }
  .plus-icon-enter-to {
    opacity: 1;
  }
}
</style>
