<template>
  <div class="AppletOrder">
    <el-container>
      <el-header class="hand">
        <HeaderView :activeKey.sync="agentCode" @on-chang="onTabChang" />
      </el-header>
      <el-main class="content">
        <ContentView
          v-if="pointSaleList && pointSaleList.length"
          :agentCode="agentCode"
        />
        <div class="nothing" v-else>
          <div class="nothing-img">
            <img src="./images/something.png" alt="" />
          </div>
          <span class="nothing-text">空空如也</span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import HeaderView from "./components/Header.vue";
import ContentView from "./components/Content.vue";
export default {
  name: "AppletOrder",
  components: { HeaderView, ContentView },
  data() {
    return {
      agentCode: "",
      agentInfo: {},
    };
  },
  computed: {
    ...mapState({
      pointSaleList: (state) => state.agent.pointSaleList,
    }),
    ...mapGetters({
      isMobile: "isMobile",
    }),
  },
  methods: {
    onTabChang(data) {
      this.agentInfo = data || {};
    },
  },
  mounted() {
    if (!this.isMobile) {
      this.$router.push("/Home/BasicFacts");
      return;
    }
    if (this.pointSaleList?.length) {
      this.agentCode = this.pointSaleList[0].code;
    }
    // 获取支付宝账号列表
    this.$store.dispatch("agent/GetAlipayAccountListAction");
  },
};
</script>
<style lang="scss" scoped>
.AppletOrder {
  width: 100vw;

  .hand {
    height: auto !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $--color-primary;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 0;
  }
  .content {
    position: relative;
    top: -20px;
    background: #fff;
    padding-left: 0;
    padding-right: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .nothing {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0 20px;
    &-img {
      width: 120px;
      height: 120px;
    }
    &-img img {
      width: 100%;
      height: 100%;
    }
    &-text {
      color: $--color-info;
      font-size: 14px;
      padding: 10px 0;
    }
  }
}
</style>
