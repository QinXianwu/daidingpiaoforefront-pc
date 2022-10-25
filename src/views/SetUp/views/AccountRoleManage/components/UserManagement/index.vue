<template>
  <div class="UserManagement">
    <div class="content">
      <SearchForm
        isReturnFormData
        :formData="formData"
        :isShowExportList="false"
        @on-search="onSearch"
      />
      <div class="action">
        <el-button type="primary" @click="handleAdd"> 新增账号 </el-button>
      </div>
      <TablePanel :tableData="list" :tableHead="column">
        <!-- 操作 -->
        <template #action="{ scope }">
          <div class="action-groud">
            <el-button type="text" @click="handleEdit(scope)"> 编辑 </el-button>
            <!-- <el-button type="text" @click="handleEdit(scope)"> 删除 </el-button> -->
          </div>
        </template>
      </TablePanel>
      <!-- 分页 -->
      <Pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.size"
        :current-page="page.current"
        :total="total"
      />
    </div>
    <UpdateAcconutDiaog
      :editInfo="editInfo"
      :show.sync="isUpdateAccount"
      @close="close"
    />
  </div>
</template>

<script>
import { column, formData } from "./config";
import UpdateAcconutDiaog from "./components/UpdateAcconutDiaog.vue";
export default {
  name: "UserManagement",
  components: { UpdateAcconutDiaog },
  data() {
    return {
      formData,
      column, //表格头
      editInfo: "",
      isUpdateAccount: false,
      list: [],
      page: {
        size: 10,
        current: 1,
      },
      total: 0,
      query: {}, //过滤规则
    };
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      this.page.size = val;
      this.page.current = 1;
      this.getList(true);
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getList(false);
    },
    onSearch(data) {
      this.query = { ...data };
      this.getList(true);
    },
    handleAdd() {
      this.editInfo = "";
      this.isUpdateAccount = true;
    },
    handleEdit(item) {
      this.editInfo = item;
      this.isUpdateAccount = true;
    },
    close(isRefresh = false) {
      this.editInfo = "";
      this.isUpdateAccount = false;
      if (isRefresh) this.getList();
    },
    async getList(isClear) {
      if (isClear) this.page.page = 1;
      const query = {
        ...this.page,
        paramData: { ...this.query },
      };
      const [, res] = await this.$http.AccountRoleManage.GetAccountList(query);
      console.log(res);
      if (!res?.list?.length) return;
      this.list = res.list;
      this.total = res.total;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.action {
  padding: 10px 0 15px;
}
</style>
