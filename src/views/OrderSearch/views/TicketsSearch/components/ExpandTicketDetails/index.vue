<template>
  <div class="main">
    <div class="main-title">
      <span>订单查询</span>
    </div>
    <div class="content">
      <div class="ticketing-list">
        <div
          class="ticketing-item"
          v-for="(ticketing, key) in [{}, {}]"
          :key="key"
        >
          <div class="item-title">
            <!-- {{ $CONST.TICKET_TYPE_TEXT[ticketing.ticketType] }} -->
            <div class="eorderNumber">去程：{{ "EGW28000555" }}</div>
            <div class="eorderNumber-update">
              <span class="mr-10">{{ eorderCode }}</span>
              <el-input
                v-model="eorderNumber"
                class="mr-10"
                placeholder="请输入取票号"
              />
              <el-button type="primary">修改取票号</el-button>
            </div>
          </div>
          <div class="ticketing-item-content">
            <!-- 车次信息 -->
            <HeadView />
            <!-- 乘客信息 -->
            <PassengerInfo />
          </div>
        </div>
      </div>
      <FooterView />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import HeadView from "./Head.vue";
import PassengerInfo from "./PassengerInfo.vue";
import FooterView from "./Footer.vue";
export default {
  name: "ExpandTicketDetails",
  components: { HeadView, PassengerInfo, FooterView },
  props: {
    ticketingId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      eorderNumber: "",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    eorderCode({ userInfo }) {
      return userInfo?.eOrderNumberPrefix || "";
    },
  },
  methods: {},
  mounted() {
    //
  },
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #f7f8fa;
  padding: 10px;

  &-title {
    display: flex;
    font-size: 13px;
    font-weight: 600;
    color: $main-font-color;
    line-height: 20px;
    padding: 0 0 5px;
  }
  .content {
    padding: 10px;
    background-color: #fff;
    .item-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 32px;
      font-size: 18px;
      font-weight: 400;
      color: $main-font-color;
      line-height: 32px;
    }
    .eorderNumber-update {
      display: flex;
      align-items: center;
    }
  }
  .ticketing-list {
    display: flex;
    flex-wrap: wrap;
  }
  .ticketing-item {
    padding: 20px;
    margin: 0 12px 12px;
    background-color: #f7f8fa;
  }
  .ticketing-item-content {
    margin: 5px 0 0;
  }
}
</style>
