// 编辑/新增
<template>
  <div class="UpdatePayAccount">
    <div class="container">
      <div class="title">
        <span>{{ id ? "编辑" : "新增" }}支付宝账号</span>
      </div>
      <div class="c_box-form">
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item label="支付宝账号名称:" prop="alipayAccount">
            <el-input
              class="input-medium"
              v-model="formData.alipayAccount"
              placeholder="请输入支付宝账号名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="bottom-btn">
        <el-button type="primary" :loading="isLoading" @click="handleSubmit">
          保存
        </el-button>
        <el-button @click="$emit('close')"> 取消 </el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UpdatePayAccount",
  props: {
    id: {
      type: [Number, String],
      default: "",
    },
  },
  components: {},
  data: function () {
    return {
      formData: {
        alipayAccount: "",
      },
      isLoading: false,
      rules: {
        alipayAccount: [
          {
            required: true,
            message: "请输入请输入支付宝账号名称",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // if (this.id) this.getAppRoleInfo();
  },
  computed: {},
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
      const [, res] = await this.$http.PayConfig.AddAlipayAccount({
        alipayAccount: this.formData.alipayAccount || "",
      });
      this.isLoading = false;
      if (!res) {
        return this.$message.error(
          (res && res.Message) || `${this.id ? "编辑" : "新增"}角色失败`
        );
      }
      this.$message.success(
        res.Message || `${this.id ? "编辑" : "新增"}角色成功`
      );
      this.isLoading = false;
      this.$emit("close", true);
    },
  },
};
</script>
<style lang="scss" scoped>
.UpdatePayAccount {
  background: #ffffff;
  .title {
    padding: 10px 0 0;
    font-size: 15px;
    color: $main-font-color;
    font-weight: bold;
  }
  .container {
    .c_box-form {
      padding: 30px 0 40px;
    }
    .bottom-btn {
      padding-left: 50px;
    }
  }
}
</style>
