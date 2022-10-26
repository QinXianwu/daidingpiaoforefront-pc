<template>
  <el-dialog
    :title="`${
      editInfo && editInfo.id ? '编辑' : editInfo.pid ? '新增子' : '新增'
    }账号`"
    :visible.sync="visible"
    width="550px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="150px">
      <el-form-item label="所属账号:" v-if="editInfo && editInfo.pid">
        <el-input v-model="formData.parentAccount" :disabled="true" />
      </el-form-item>
      <el-form-item label="用户名:" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="登录账号:" prop="account">
        <el-input
          :disabled="!!editInfo.id"
          v-model="formData.account"
          placeholder="请输入登录账号"
        />
      </el-form-item>
      <el-form-item label="登录密码:" prop="password" v-if="!editInfo.id">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="请输入登录密码"
        />
      </el-form-item>
      <el-form-item label="电子订单号前缀:" prop="eOrderNumberPrefix">
        <el-input
          v-model="formData.eOrderNumberPrefix"
          placeholder="请输入电子订单号前缀"
        />
      </el-form-item>
      <el-form-item label="代售点:" prop="pointSaleId">
        <el-select
          v-model="formData.pointSaleId"
          placeholder="请选择代售点"
          v-loading="isLoadingSiteList"
        >
          <el-option
            :key="index"
            :label="item.name"
            :value="Number(item.id)"
            v-for="(item, index) in pointSaleOptions"
          >
          </el-option>
        </el-select>
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
  name: "UpdateAcconutDiaog",
  mixins: [dialogMixin],
  props: {
    editInfo: {
      type: [Object, String],
      default: () => ({}),
    },
  },
  watch: {
    visible(val) {
      this.getPointSaleOptions();
      // 新增
      if (!val) {
        this.formData = {
          userName: "",
          account: "",
          password: "",
          eOrderNumberPrefix: "",
          parentAccount: this.editInfo?.parentAccount || "",
        };
        return;
      }
      // 修改
      if (this.editInfo?.id) {
        this.formData = { ...this.editInfo };
        if (this.formData?.pointSaleId) {
          const arr = JSON.parse(this.formData?.pointSaleId);
          this.formData.pointSaleId = arr?.length ? arr[0] : "";
        }
      }
    },
  },
  data() {
    return {
      formData: {
        userName: "",
        account: "",
        password: "",
        eOrderNumberPrefix: "",
      },
      pointSaleOptions: [],
      isLoading: false,
      isLoadingSiteList: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        account: [
          {
            required: true,
            message: "请输入登录账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入登录密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  methods: {
    // 获取代售点列表
    async getPointSaleOptions() {
      this.isLoadingSiteList = true;
      const [, res] =
        await this.$http.AccountRoleManage.GetAccountByPointSale();
      this.pointSaleOptions = res?.length ? res : [];
      this.isLoadingSiteList = false;
    },
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
      const id = this.editInfo?.id || "";
      const pid = this.editInfo?.pid || "";
      const query = { ...this.formData };
      const pointSaleId = this.formData.pointSaleId
        ? [Number(this.formData.pointSaleId)]
        : [];
      query.pointSaleId = JSON.stringify(pointSaleId);
      if (pid) query.id = pid;
      delete query.pid;
      delete query.parentAccount;

      const [, res] = await this.$http.AccountRoleManage[
        id ? "UpdateAccount" : pid ? "AddSubAccount" : "AddAccount"
      ]({ ...query });
      this.isLoading = false;
      this.$message[res ? "success" : "error"](
        res?.message ||
          `${id ? "编辑" : pid ? "新增子" : "新增"}账号${res ? "成功" : "失败"}`
      );
      if (res) this.handleClose(true);
    },
  },
};
</script>
<style lang="scss" scoped></style>
