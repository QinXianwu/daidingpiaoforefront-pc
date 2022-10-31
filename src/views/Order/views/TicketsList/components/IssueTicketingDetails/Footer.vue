<template>
  <div class="footer">
    <div class="item">
      <div class="mobile-phone">
        <CopyButton :copyString="mobilePhone || ''">
          <span class="phone">{{ mobilePhone | formatMobile }}</span>
          <span class="copy">复制</span>
        </CopyButton>
      </div>
      <div class="application">
        <el-button type="primary" @click="matchSerialNumber">
          <span>匹配流水号</span>
        </el-button>
        <el-button @click="isSerialNumber = false">手填流水号</el-button>
        <el-input
          class="input-serialNumber"
          v-model="serialNumber"
          placeholder="请匹配流水号或手填流水号"
          :clearable="true"
          :disabled="isSerialNumber"
          @input="(value) => $emit('update:payTradeNumber', value)"
        ></el-input>
      </div>
    </div>
    <div class="item">
      <div class="emit">
        <span class="label mr-10">电子订单号：{{ eOrderNumberPrefix }}</span>
        <el-input
          type="emit"
          :value="eorderNumber"
          class="min-input"
          placeholder="选填"
          @input="(value) => $emit('update:eorderNumber', value)"
        />
      </div>
    </div>
    <div class="submit">
      <el-button type="success" size="medium" @click="$emit('onSubmit', true)"
        >有票</el-button
      >
      <el-button type="danger" size="medium" @click="$emit('onSubmit', false)"
        >无票</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CopyButton from "@/components/CopyButton/index";
export default {
  props: {
    // 订单id
    partnerOrderId: {
      type: String,
      default: "",
    },
    // 总金额
    amount: {
      type: [Number, String],
      default: "",
    },
    // 支付宝账号
    alipayAccount: {
      type: String,
      default: "",
    },
    mobilePhone: {
      type: String,
      default: "",
    },
    // 订单支付流水号
    payTradeNumber: {
      type: String,
      default: "",
    },
    // 电子订单号
    eorderNumber: {
      type: String,
      default: "",
    },
  },
  components: { CopyButton },
  data() {
    return {
      serialNumber: "",
      isSerialNumber: true,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    eOrderNumberPrefix({ userInfo }) {
      return userInfo?.eOrderNumberPrefix || "";
    },
  },
  methods: {
    // 匹配流水号
    async matchSerialNumber() {
      if (!this.alipayAccount) return this.$message.error("请选择支付宝账号");
      if (!this.amount) return this.$message.error("请输入金额");
      const [, res] = await this.$http.Order.GetAlipaySerialNumber({
        body: {
          amount: String(this.amount),
          partnerOrderId: this.partnerOrderId,
          payAccountName: this.alipayAccount,
          agentCode: this.$router.currentRoute.meta.agentCode,
        },
      });
      if (!res?.length) return this.$message.error("该订单未匹配到支付流水号");
      const filterDate = res.filter((item) => item.direction === "支出");
      if (!filterDate?.length)
        return this.$message.error("该订单未匹配到支付流水号");
      // console.log(filterDate);
      const paymentNumber = filterDate[0]?.paymentNumber || "";
      this.serialNumber = paymentNumber;
      this.$emit("update:payTradeNumber", this.serialNumber);
      this.isSerialNumber = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  margin-left: 30px;
  .mobile-phone {
    color: $main-font-color;
    margin-right: 50px;
    .phone {
      font-size: 22px;
      font-weight: 500;
      color: $main-font-color;
    }
  }
  .application {
    display: flex;
    align-items: center;
    .input-serialNumber {
      width: 380px;
      margin: 0 0 0 20px;
    }
  }
  .emit {
    padding: 20px 10px;
    font-size: 14px;
    font-weight: 400;
    color: $sub-font-color;
  }
}

.submit {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #eee;
}

.copy {
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  padding: 2px 10px;
  margin: 0 10px;
  background: #eee;
}
</style>
