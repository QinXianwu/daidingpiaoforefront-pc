<template>
  <el-dialog
    title="退票审核"
    :visible.sync="visible"
    width="550px"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="110px">
      <el-form-item label="退票类型:" prop="refundResult">
        <el-select
          class="input-medium"
          v-model="formData.refundResult"
          placeholder="请选择退票类型"
        >
          <el-option
            v-for="item in $CONST.REFUND_ACTION_TYPE_OPTIONS()"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="退票失败原因:"
        prop="failReason"
        v-if="formData.refundResult !== $CONST.REFUND_ACTION_TYPE.SUCCESS"
      >
        <el-input
          class="input-medium"
          v-model="formData.failReason"
          placeholder="请输入退票失败原因"
        />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" :loading="isLoading" @click="handleSubmit">
        保存
      </el-button>
      <el-button @click="handleClose(false)"> 取消 </el-button>
    </span>
  </el-dialog>
</template>
<script>
import dialogMixin from "@/mixins/dialogMixin";
export default {
  name: "UpdatePayAccountDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      if (val && this.editInfo?.id) {
        this.formData = {
          id: this.editInfo.id,
          agentCode: this.editInfo?.refundAgentCode || "",
          failReason: "",
          refundPrice: 0, // 后端规定 非现金为0
          refundResult: "",
        };
      } else {
        this.formData = {
          failReason: "",
          refundPrice: 0, // 后端规定 非现金为0
          refundResult: "",
        };
      }
    },
  },
  data() {
    return {
      formData: {
        failReason: "",
        refundPrice: 0, // 后端规定 非现金为0
        refundResult: "",
      },
      isLoading: false,
      rules: {
        refundResult: [
          {
            required: true,
            message: "请选择退票类型",
            trigger: "blur",
          },
        ],
        failReason: [
          {
            required: true,
            message: "请输入退票失败原因",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    //
  },
  methods: {
    // 处理提交
    async handleSubmit() {
      // 表单校验
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) {
          return;
        }
      } catch (error) {
        return;
      }
      this.isLoading = true;
      const [, res] = await this.$http.OrderRefund.TicketingRefundAction({
        ...this.formData,
      });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message || `审核${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>
