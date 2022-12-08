<template>
  <div class="action">
    <div class="action-item">
      <span class="action-item-l">
        <span class="label">是否开启接单</span>
        <ElPopover width="220" trigger="hover" placement="right-start">
          <i class="el-icon-question ml-10" slot="reference"></i>
          <div class="receiveOrders-tip">
            <p>出票订单均由系统分配，账户必须开启开关才可能接到订单。</p>
            <p>停止出票后请关闭开关，否则会影响该账户进单量。</p>
            <p>若长时间未处理订单，系统会自动关闭接单。</p>
          </div>
        </ElPopover>
      </span>
      <span class="action-item-r value">
        <ElSwitch
          v-model="isReceiveOrders"
          :disabled="!agentCode"
          @change="onOpenReceiveOrders"
        />
      </span>
    </div>
    <div class="action-item">
      <span class="action-item-l">
        <span class="label">是否开启声音</span>
        <ElPopover width="220" trigger="hover" placement="right-start">
          <i class="el-icon-question ml-10" slot="reference"></i>
          <div class="receiveOrders-tip">
            <p>点击将关闭所有代售点声音</p>
          </div>
        </ElPopover>
      </span>
      <span class="action-item-r value">
        <ElSwitch ref="openSound" :value="isAudio" @change="onOpenSound" />
      </span>
    </div>
    <div class="action-item">
      <span class="action-item-l">
        <span class="label">支付宝账号</span>
      </span>
      <span class="action-item-r value">
        <ElSelect
          v-model="account"
          placeholder="请选择支付宝账号"
          @change="onSelectAlipayAccount"
        >
          <ElOption
            v-for="item in alipayAccountOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @click.stop.native="() => {}"
          >
          </ElOption>
        </ElSelect>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "Action",
  components: {},
  props: {
    agentCode: {
      type: String,
      default: "",
    },
    alipayAccount: {
      type: String,
      default: "",
    },
  },
  watch: {
    agentCode(val) {
      const item = this.pointSaleList.find((item) => item?.code === val);
      this.isReceiveOrders = !!item?.openOrderReceiving;
    },
  },
  data() {
    return {
      account: "",
      isReceiveOrders: false, // 是否开启接受订单
    };
  },
  computed: {
    ...mapState({
      pointSaleList: (state) => state.agent.pointSaleList,
      isAudio: (state) => state.app.isAudio, // 是否开启声音
    }),
    ...mapGetters({
      alipayAccountOptions: "agent/alipayAccountOptions",
    }),
  },
  methods: {
    async onOpenReceiveOrders(val) {
      if (!this.agentCode) return;
      const [, res] = await this.$http.Order.UpdateTicketingSwitch({
        agentCode: this.agentCode,
        bodyInfo: {
          action: val ? "on" : "off",
        },
      });
      if (Number(res?.code) !== this.AJAX_CODE.SUCCESS) {
        this.isReceiveOrders = !val;
        this.$message.error(`${val ? "开启" : "关闭"}接单失败`);
        return;
      }
      // 修改成功需同步vuex中的pointSaleList
      const tempList = [...this.pointSaleList];
      const item = tempList.find((item) => item.code === this.agentCode);
      item.openOrderReceiving = val;
      this.isReceiveOrders = val;
      this.$store.commit("agent/SET_POINT_SALE_LIST", tempList);
      this.$message.success(`${val ? "开启" : "关闭"}接单成功`);
    },
    onOpenSound(val) {
      this.$store.commit("app/SET_IS_AUDIO", val);
    },
    onSelectAlipayAccount(val) {
      const item = this.alipayAccountOptions.find((item) => item.value === val);
      this.$emit("update:alipayAccount", item?.label || "");
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.action {
  padding: 0 20px 20px;
  margin: 0 0 10px;
  background: #fff;

  .receiveOrders-tip {
    color: $--color-warning;
  }
  ::v-deep .el-scrollbar .el-scrollbar__bar {
    opacity: 1 !important;
  }
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 30px;
    &:last-child {
      padding-bottom: 0;
    }
    .label {
      font-size: 15px;
      font-weight: bold;
      color: $main-font-color;
    }
  }
}
</style>
