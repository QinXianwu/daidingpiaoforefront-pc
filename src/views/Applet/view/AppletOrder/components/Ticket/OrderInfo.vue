<template>
  <div class="OrderInfo">
    <el-form label-width="90px" label-position="left">
      <el-form-item label="订单号" prop="code">
        <span>{{ orderInfo.partnerOrderId || "-" }}</span>
      </el-form-item>
      <el-form-item label="订单标记" prop="order_mark">
        <span>{{ orderInfo.order_mark || "-" }}</span>
      </el-form-item>
      <el-form-item label="订单时间" prop="currentTime">
        <span>{{ orderInfo.currentTime || "-" }}</span>
      </el-form-item>
      <el-form-item label="联系人" prop="contactMobile">
        <CopyButton :copyString="orderInfo.contactMobile || '-'">
          <span class="value">{{ orderInfo.contactMobile || "-" }}</span>
          <el-tag size="mini">复制</el-tag>
        </CopyButton>
      </el-form-item>
      <el-form-item label="流水号" prop="serialNumber">
        <div class="serialNumber">
          <el-input
            v-if="!isSerialNumber"
            v-model="serialNumber"
            placeholder="请匹配流水号或手填流水号"
            :clearable="true"
            :disabled="isSerialNumber"
            @input="onInputSerialNum"
          />
          <el-select
            v-else
            :value="serialNumber"
            :disabled="!alipaySerialNumList.length"
            :placeholder="`请${
              alipaySerialNumList.length ? '选择' : '匹配'
            }流水号或手填流水号`"
            :clearable="true"
            @change="selectSerialNumber"
          >
            <el-option
              v-for="(item, index) in alipaySerialNumList"
              :key="index"
              :label="item.paymentNumber"
              :value="item.paymentNumber"
              >{{ item.paymentNumber }}</el-option
            >
          </el-select>
          <div class="serialNumber-action">
            <el-button type="primary" @click="matchSerialNumber">
              <span>匹配流水号</span>
            </el-button>
            <el-button @click="isSerialNumber = false">手填流水号</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="电子订单号" class="eorderNumber" prop="eorderNumber">
        <el-input
          :type="eOrderNumberPrefix ? 'tel' : 'text'"
          placeholder="选填"
          :value="eorderNumber"
          @input="(val) => $emit('update:eorderNumber', value)"
        >
          <template slot="prepend" v-if="eOrderNumberPrefix">{{
            eOrderNumberPrefix
          }}</template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CopyButton from "@/components/CopyButton/index";

export default {
  name: "OrderInfo",
  components: { CopyButton },
  props: {
    orderInfo: {
      type: Object,
      default: () => ({}),
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
    // 订单支付流水号信息
    payTradeInfo: {
      type: Object,
      default: () => ({}),
    },
    // 电子订单号
    eorderNumber: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      serialNumber: "",
      serialInfo: {
        amount: "",
        bizOrigNo: "",
        direction: "",
        merchantOrderNo: "",
        payAccount: "",
        paymentNumber: "",
        transDt: "",
      },
      isSerialNumber: true,
      alipaySerialNumList: [],
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
    // 选择支付流水号
    selectSerialNumber(val) {
      this.serialNumber = val;
      const item = this.alipaySerialNumList.find(
        (ele) => ele.paymentNumber === val
      );
      this.$emit("update:payTradeInfo", { ...item });
    },
    // 手填流水号
    onInputSerialNum(val) {
      this.$emit("update:payTradeInfo", {
        ...this.serialInfo,
        amount: String(this.amount),
        paymentNumber: val,
      });
    },
    // 匹配流水号
    async matchSerialNumber() {
      if (!this.alipayAccount) return this.$message.error("请选择支付宝账号");
      if (!this.amount) return this.$message.error("请输入订单金额");
      let [, res] = await this.$http.Order.GetAlipaySerialNumber({
        body: {
          amount: String(this.amount),
          partnerOrderId: this.orderInfo.partnerOrderId,
          payAccountName: this.alipayAccount,
          agentCode: this.orderInfo?.agentCode || "",
        },
      });
      if (!res?.length) {
        this.isSerialNumber = true;
        return this.$message.error("该订单未匹配到支付流水号");
      }
      if (res.length === 1) {
        const tempObj = res[0] || {};
        const paymentNumber = tempObj?.paymentNumber || "";
        this.serialNumber = paymentNumber;
        this.$emit("update:payTradeInfo", { ...tempObj });
        this.isSerialNumber = false;
      } else {
        this.$message.success("请选择订单支付流水号");
        this.alipaySerialNumList = res;
        this.isSerialNumber = true;
      }
    },
  },
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.OrderInfo {
  padding: 10px 10px 0;
  margin: 10px;
  border-top: 1px solid #eee;
  .value {
    font-size: 15px;
    color: $main-font-color;
  }
  .copy_button {
    padding: 0 0;
  }
  .serialNumber-action {
    margin: 5px 0;
  }
  .serialNumber,
  ::v-deep .eorderNumber .el-form-item__content {
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #e5e5e5;
  }
  ::v-deep .el-form-item {
    margin-bottom: 10px;
    input {
      border: none;
      padding-left: 0;
      text-align: left;
    }
  }
  ::v-deep .el-radio,
  ::v-deep .el-select {
    -webkit-tap-highlight-color: transparent !important;
  }
}
</style>
