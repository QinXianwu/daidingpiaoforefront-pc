<template>
  <div class="OrderInfo">
    <el-form label-width="80px" label-position="left">
      <el-form-item label="订单号" prop="name">
        <CopyButton :copyString="passengerInfo.passengerName || '-'">
          <span class="value">{{ passengerInfo.passengerName || "-" }}</span>
          <el-tag size="mini">复制</el-tag>
        </CopyButton>
      </el-form-item>
      <el-form-item label="身份证" prop="passportNumber">
        <CopyButton :copyString="passengerInfo.passportNumber || '-'">
          <span class="value">{{ passengerInfo.passportNumber || "-" }}</span>
          <el-tag size="mini">复制</el-tag>
        </CopyButton>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton/index";

export default {
  name: "OrderInfo",
  components: { CopyButton },
  data() {
    return {
      passengerInfo: {},
    };
  },
  computed: {},
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.OrderInfo {
  padding: 10px;
  margin: 20px 10px 10px;
  border-top: 1px solid #f5f5f5;
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
