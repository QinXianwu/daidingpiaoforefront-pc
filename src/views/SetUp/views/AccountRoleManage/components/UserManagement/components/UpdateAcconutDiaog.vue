<template>
  <el-dialog
    :title="`${
      editInfo && editInfo.id ? '编辑' : editInfo.pid ? '新增子' : '新增'
    }账号`"
    :visible.sync="visible"
    width="700px"
    v-loading="isLoading"
    @close="handleClose(false)"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="170px">
      <el-form-item label="所属账号:" v-if="formData.parentAccount">
        <el-input
          :disabled="true"
          class="input-medium"
          v-model="formData.parentAccount"
        />
      </el-form-item>
      <el-form-item label="用户名:" prop="userName">
        <el-input
          class="input-medium"
          v-model="formData.userName"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item label="登录账号:" prop="account">
        <el-input
          class="input-medium"
          :disabled="!!editInfo.id"
          v-model="formData.account"
          placeholder="请输入登录账号"
        />
      </el-form-item>
      <el-form-item label="登录密码:" prop="password" v-if="!editInfo.id">
        <el-input
          type="password"
          class="input-medium"
          v-model="formData.password"
          placeholder="请输入登录密码"
        />
      </el-form-item>
      <el-form-item
        label="是否设置为管理员:"
        prop="administration"
        v-if="!editInfo.parentAccount"
      >
        <el-switch
          v-model="formData.administration"
          active-text="是"
          inactive-text="否"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="代售点:" prop="pointSaleId">
        <el-select
          v-model="formData.pointSaleId"
          v-loading="isLoadingSiteList"
          placeholder="请选择代售点"
          class="input-medium"
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
      <el-form-item label="电子订单号前缀:" prop="eOrderNumberPrefix">
        <el-input
          class="input-medium"
          v-model="formData.eOrderNumberPrefix"
          placeholder="请输入电子订单号前缀"
        />
      </el-form-item>
      <el-form-item label="接单量上限:" prop="receiveOrderLimit">
        <el-input-number
          class="input-medium"
          v-model="formData.receiveOrderLimit"
          :precision="0"
          :step="1"
          :min="0"
          :max="9999"
          placeholder="请输入接单量上限"
        />
      </el-form-item>
      <el-collapse
        accordion
        class="more-config"
        @change="(val) => (allocationName = val)"
      >
        <el-collapse-item name="allocationConfig">
          <template slot="title">
            <div class="collapse-title">
              <span>{{
                allocationName === "allocationConfig" ? "收起" : "展开"
              }}</span>
              <span>订单分配限制配置</span>
            </div>
          </template>
          <div class="more-config-content">
            <el-form-item label="接单省份限制:" prop="receiveOrderProvince">
              <el-cascader
                class="input-medium"
                :options="provinceOptions"
                placeholder="请选择接单省份限制"
                :props="{ value: 'label' }"
                v-model="formData.receiveOrderProvince"
              />
            </el-form-item>
            <el-form-item label="接单证件类型:" prop="documentType">
              <el-select
                multiple
                collapse-tags
                value-key="label"
                class="input-medium"
                placeholder="请选择接单证件类型"
                v-model="formData.documentType"
              >
                <div class="select-all">
                  <el-checkbox
                    :value="
                      formData.documentType.length ===
                      $CONST.PASSPORT_TYPE_OPTIONS().length
                    "
                    @change="selectAll('documentType')"
                    >全选</el-checkbox
                  >
                </div>
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                  v-for="(item, index) in $CONST.PASSPORT_TYPE_OPTIONS()"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接单指定的坐席:" prop="designatedSeats">
              <el-select
                multiple
                collapse-tags
                class="input-medium"
                placeholder="请选择接单指定的坐席"
                v-model="formData.designatedSeats"
              >
                <div class="select-all">
                  <el-checkbox
                    :value="
                      formData.designatedSeats.length ===
                      $CONST.SEAT_OPTIONS().length
                    "
                    @change="selectAll('designatedSeats')"
                    >全选</el-checkbox
                  >
                </div>
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in $CONST.SEAT_OPTIONS()"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="接单距离发车时间之内:"
              prop="withinDepartureTime"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.withinDepartureTime"
                :precision="0"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单距离发车时间"
              />
              <div class="form-tip">
                <span>
                  进单距离发车时间,限制多少小时内 如24小时内 值为24,无限制为-1
                </span>
              </div>
            </el-form-item>
            <el-form-item
              label="接单距离发车时间之后:"
              prop="afterDepartureTime"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.afterDepartureTime"
                :precision="0"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单距离发车时间"
              />
              <div class="form-tip">
                <span>
                  进单距离发车时间,限制多少小时后 如24小时后 值为24,无限制为-1
                </span>
              </div>
            </el-form-item>
            <el-form-item
              label="接单订单金额上限:"
              prop="orderAmountUpperLimit"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.orderAmountUpperLimit"
                :precision="2"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单订单金额上限"
              />
              <div class="form-tip">接单订单金额上限,无限制为-1</div>
            </el-form-item>
            <el-form-item
              label="接单订单金额下限:"
              prop="lowerLimitOfOrderAmount"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.lowerLimitOfOrderAmount"
                :precision="2"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单订单金额下限"
              />
              <div class="form-tip">接单订单金额下限,无限制为-1</div>
            </el-form-item>
            <el-form-item
              label="接单有无特殊要求限制:"
              prop="specialRequirements"
            >
              <el-select
                v-model="formData.specialRequirements"
                placeholder="请选择接单有无特殊要求限制"
                class="input-medium"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in $CONST.SPECIAL_REQUIREMENTS_OPTIONS()"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- <el-collapse
        accordion
        class="more-config"
        @change="(val) => (collapseName = val)"
      >
        <el-collapse-item name="moreConfig">
          <template slot="title">
            <div class="collapse-title">
              <span>{{ collapseName === "moreConfig" ? "收起" : "展开" }}</span>
              <span>更多配置</span>
            </div>
          </template>
          <div class="more-config-content">
            <el-form-item label="代售点:" prop="pointSaleId">
              <el-select
                v-model="formData.pointSaleId"
                v-loading="isLoadingSiteList"
                placeholder="请选择代售点"
                class="input-medium"
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
            <el-form-item label="电子订单号前缀:" prop="eOrderNumberPrefix">
              <el-input
                class="input-medium"
                v-model="formData.eOrderNumberPrefix"
                placeholder="请输入电子订单号前缀"
              />
            </el-form-item>
            <el-form-item label="接单证件类型:" prop="documentType">
              <el-select
                multiple
                collapse-tags
                value-key="label"
                class="input-medium"
                placeholder="请选择接单证件类型"
                v-model="formData.documentType"
              >
                <div class="select-all">
                  <el-checkbox
                    :value="
                      formData.documentType.length ===
                      $CONST.PASSPORT_TYPE_OPTIONS().length
                    "
                    @change="selectAll('documentType')"
                    >全选</el-checkbox
                  >
                </div>
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                  v-for="(item, index) in $CONST.PASSPORT_TYPE_OPTIONS()"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接单省份限制:" prop="receiveOrderProvince">
              <el-cascader
                class="input-medium"
                :options="provinceOptions"
                placeholder="请选择接单省份限制"
                :props="{ value: 'label' }"
                v-model="formData.receiveOrderProvince"
              />
            </el-form-item>
            <el-form-item
              label="接单有无特殊要求限制:"
              prop="specialRequirements"
            >
              <el-select
                v-model="formData.specialRequirements"
                placeholder="请选择接单有无特殊要求限制"
                class="input-medium"
              >
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in $CONST.SPECIAL_REQUIREMENTS_OPTIONS()"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接单指定的坐席:" prop="designatedSeats">
              <el-select
                multiple
                collapse-tags
                class="input-medium"
                placeholder="请选择接单指定的坐席"
                v-model="formData.designatedSeats"
              >
                <div class="select-all">
                  <el-checkbox
                    :value="
                      formData.designatedSeats.length ===
                      $CONST.SEAT_OPTIONS().length
                    "
                    @change="selectAll('designatedSeats')"
                    >全选</el-checkbox
                  >
                </div>
                <el-option
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in $CONST.SEAT_OPTIONS()"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="接单量上限:" prop="receiveOrderLimit">
              <el-input-number
                class="input-medium"
                v-model="formData.receiveOrderLimit"
                :precision="0"
                :step="1"
                :min="0"
                :max="9999"
                placeholder="请输入接单量上限"
              />
            </el-form-item>
            <el-form-item
              label="接单订单金额上限:"
              prop="orderAmountUpperLimit"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.orderAmountUpperLimit"
                :precision="2"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单订单金额上限"
              />
              <div class="form-tip">接单订单金额上限,无限制为-1</div>
            </el-form-item>
            <el-form-item
              label="接单订单金额下限:"
              prop="lowerLimitOfOrderAmount"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.lowerLimitOfOrderAmount"
                :precision="2"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单订单金额下限"
              />
              <div class="form-tip">接单订单金额下限,无限制为-1</div>
            </el-form-item>
            <el-form-item
              label="接单距离发车时间之内:"
              prop="withinDepartureTime"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.withinDepartureTime"
                :precision="0"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单距离发车时间"
              />
              <div class="form-tip">
                <span>
                  进单距离发车时间,限制多少小时内 如24小时内 值为24,无限制为-1
                </span>
              </div>
            </el-form-item>
            <el-form-item
              label="接单距离发车时间之后:"
              prop="afterDepartureTime"
            >
              <el-input-number
                class="input-medium"
                v-model="formData.afterDepartureTime"
                :precision="0"
                :step="1"
                :min="-1"
                :max="9999999999"
                placeholder="请输入接单距离发车时间"
              />
              <div class="form-tip">
                <span>
                  进单距离发车时间,限制多少小时后 如24小时后 值为24,无限制为-1
                </span>
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse> -->
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
import { mapGetters } from "vuex";
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
    visible() {
      this.getPointSaleOptions();
      this.init();
    },
  },
  data() {
    return {
      formData: {
        receiveOrderProvince: ["全部"],
        documentType: [],
        designatedSeats: [],
      },
      pointSaleOptions: [],
      collapseName: "",
      allocationName: "",
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
  computed: {
    ...mapGetters({
      provinceOptions: "user/provinceOptions",
    }),
  },
  methods: {
    init() {
      this.formData = {
        userName: "",
        account: "",
        password: "",
        administration: false,
        parentAccount: this.editInfo?.parentAccount || "",
        specialRequirements: this.$CONST.SPECIAL_REQUIREMENTS.UNLIMITED,
        receiveOrderProvince: ["全部"],
        documentType: [],
        designatedSeats: [],
      };
      // 修改
      if (!this.editInfo?.id) return;
      this.formData = { ...this.formData, ...this.editInfo };
      if (this.formData?.pointSaleId) {
        const arr = JSON.parse(this.formData?.pointSaleId || "`[]`");
        this.formData.pointSaleId = arr?.length ? arr[0] : "";
      }
      if (this.formData?.receiveOrderProvince) {
        const arr = JSON.parse(this.formData?.receiveOrderProvince || "`[]`");
        this.formData.receiveOrderProvince = arr?.length ? arr : ["全部"];
      }
      if (this.formData?.documentType) {
        const arr = JSON.parse(this.formData?.documentType || "`[]`");
        this.formData.documentType = arr?.length ? arr : [];
      }
      if (this.formData?.designatedSeats) {
        const arr = JSON.parse(this.formData?.designatedSeats || "`[]`");
        this.formData.designatedSeats = arr?.length ? arr : [];
      }
    },
    // 获取代售点列表
    async getPointSaleOptions() {
      this.isLoadingSiteList = true;
      const [, res] =
        await this.$http.AccountRoleManage.GetAccountByPointSale();
      this.pointSaleOptions = res?.length ? res : [];
      this.isLoadingSiteList = false;
    },
    // 全选select
    selectAll(formKey) {
      const optionMap = {
        documentType: "PASSPORT_TYPE_OPTIONS",
        designatedSeats: "SEAT_OPTIONS",
      };
      if (!optionMap[formKey]) return;
      const options = this.$CONST[optionMap[formKey]]();
      if (this.formData[formKey]?.length === options.length) {
        this.formData[formKey] = [];
        return;
      }
      this.formData[formKey] = options.map((item) => item.label);
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
      const receiveOrderProvince = this.formData.receiveOrderProvince;
      const documentType = this.formData.documentType;
      const designatedSeats = this.formData.designatedSeats;
      const allIndex = receiveOrderProvince.findIndex(
        (item) => item === "全部"
      );
      if (allIndex >= 0) receiveOrderProvince.splice(allIndex, 1);
      query.pointSaleId = JSON.stringify(pointSaleId);
      query.documentType = JSON.stringify(documentType);
      query.designatedSeats = JSON.stringify(designatedSeats);
      query.receiveOrderProvince = JSON.stringify(receiveOrderProvince);
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
  mounted() {
    this.$store.dispatch("user/GetPointSaleListAction");
  },
};
</script>
<style lang="scss" scoped>
.more-config {
  border: none;

  ::v-deep {
    .el-collapse-item__wrap,
    .el-collapse-item__header,
    .el-collapse-item__content {
      border: none;
    }
    .el-collapse-item__header {
      width: 155px;
      display: flex;
      justify-content: center;
      line-height: 20px;
      height: 20px;
      margin-bottom: 10px;
    }
  }
  .collapse-title {
    width: 100%;
    text-align: right;
    color: $--color-info;
    margin: 0 2px 0 0px;
  }
}
.select-all {
  padding: 0 20px;
  text-align: right;
}
</style>
