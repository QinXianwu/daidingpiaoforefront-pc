<template>
  <div class="TicketFromData">
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="姓名" prop="name">
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
      <el-form-item label="出票姓名" prop="ticketName">
        <el-input
          type="text"
          placeholder="同音不同字时填写票机展示姓名"
          v-model="formData.ticketName"
        />
      </el-form-item>
      <el-form-item label="车厢" prop="carriageNo">
        <el-input
          type="text"
          placeholder="请输入车厢"
          v-model="formData.carriageNo"
        />
      </el-form-item>
      <el-form-item label="座号" prop="seatNo">
        <el-input
          type="text"
          placeholder="请输入乘客座号"
          v-model="formData.seatNo"
        />
      </el-form-item>
      <el-form-item label="票价" prop="realTicketPrice">
        <el-input-number
          type="number"
          :min="0"
          :max="99999999"
          :precision="2"
          :controls="false"
          placeholder="请输入票价"
          v-model="formData.realTicketPrice"
        />
      </el-form-item>
      <el-form-item label="座位" prop="seatName">
        <el-radio-group class="info-radiogroup" v-model="formData.seatName">
          <el-radio
            :key="ele.value"
            :label="ele.label"
            class="info-radiogroup-item"
            v-for="ele in seatTypeOptions"
            >{{ ele.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CopyButton from "@/components/CopyButton/index";

export default {
  name: "TicketFromData",
  components: { CopyButton },
  props: {
    ticketInfo: {
      type: Object,
      default: () => ({}),
    },
    seatTypeOptions: {
      type: Array,
      default: () => [],
    },
    passengerInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {
        ticketName: "",
        seatName: "",
        carriageNo: "",
        seatNo: "",
        realTicketPrice: "",
      },
      rules: {
        ticketName: [
          { required: true, message: "请输入出票姓名", trigger: "blur" },
        ],
        seatName: [
          { required: true, message: "请选择乘客座位类型", trigger: "blur" },
        ],
        carriageNo: { required: true, message: "请输入车厢", trigger: "blur" },
        seatNo: [
          { required: true, message: "请输入乘客座号", trigger: "blur" },
        ],
        realTicketPrice: [
          { required: true, message: "请输入票价", trigger: "blur" },
        ],
      },
    };
  },
  computed: {},
  methods: {
    // 处理提交
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return false;
        }
      } catch (error) {
        return false;
      }
      return this.formData;
    },
  },
  mounted() {
    if (this.seatTypeOptions?.length) {
      const itemSeat = this.seatTypeOptions.find(
        (item) => item?.label === this.ticketInfo?.seatName
      );
      this.formData.seatName = itemSeat
        ? itemSeat.label
        : this.seatTypeOptions[0].label;
    } else {
      this.formData.seatName = this.ticketInfo.seatName;
    }
    this.formData.ticketName =
      this.passengerInfo?.passengerName.replace(/\s*/g, "") || "";
    this.formData.realTicketPrice = this.ticketInfo.ticketPrice;
  },
};
</script>
<style lang="scss" scoped>
.TicketFromData {
  padding: 10px 10px 5px;
  margin: 10px 10px 0px;
  background: #ffffff;
  box-shadow: 0px 0px 16px 1px rgba(81, 113, 170, 0.16);
  border-radius: 12px;
  .name {
    margin-right: 10px;
  }
  .value {
    font-size: 15px;
    font-weight: 500;
    color: $main-font-color;
  }
  ::v-deep .el-form-item__content {
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
  ::v-deep .el-radio {
    -webkit-tap-highlight-color: transparent !important;
  }
}
</style>
