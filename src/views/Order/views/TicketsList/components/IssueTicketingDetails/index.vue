<template>
  <div class="main">
    <div class="main-title">
      <span>出票明细</span>
    </div>
    <div class="content">
      <div
        class="ticketing-item"
        v-for="(ticketing, key) in ticketingList"
        :key="key"
      >
        <span class="item-title">
          {{ $CONST.TICKET_TYPE_TEXT[ticketing.ticketType] }}
        </span>
        <div class="ticketing-item-content">
          <!-- 出票头部信息 -->
          <HeadView :info="ticketing" />
          <div class="content-info">
            <div class="remark">
              <span>可接受席位：{{ ticketing.acceptSeatRemark || "空" }}</span>
            </div>
            <div
              class="info"
              :key="index"
              v-for="(item, index) in ticketing.passengerList"
            >
              <div class="credential-type">
                <span
                  >{{ index + 1 }}.{{
                    $CONST.PASSPORT_TYPE_TEXT[item.passportType]
                  }}</span
                >
              </div>
              <PassengerInfo
                :key="index"
                :passengerInfo="item"
                :ref="`PassengerInfo-${item.id}`"
                :seatTypeOptions="getSeatTypeOptions(ticketing.acceptSeatName)"
              />
            </div>
          </div>
        </div>
      </div>
      <FooterView :mobilePhone="orderInfo.contactMobile" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script>
import HeadView from "./Head.vue";
import FooterView from "./Footer.vue";
import PassengerInfo from "./PassengerInfo.vue";

export default {
  name: "IssueTicketingDetails",
  components: { HeadView, PassengerInfo, FooterView },
  props: {
    orderInfo: {
      type: Object,
      default: () => ({}),
    },
    ticketingList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      fromDataMap: {}, // 乘客表单map
      validationMethodsList: [], // 校验方法列表
    };
  },
  created() {
    // console.log("出票详情");
  },
  computed: {},
  methods: {
    // 获取座位类型
    getSeatTypeOptions(arrJson) {
      const arr = typeof arrJson === "string" ? JSON.parse(arrJson) : [];
      return arr.map((item, index) => ({
        label: item,
        value: index,
      }));
    },
    // 处理 PassengerInfo 数据
    handlePassengerInfo() {
      if (!this.ticketingList?.length) return;
      this.ticketingList.map((ticketing) => {
        const passengerList = ticketing?.passengerList || [];
        passengerList.forEach(async (item) => {
          // dom中使用for -> PassengerInfo组件只有一个
          const index = 0;
          const PassengerInfo = this.$refs[`PassengerInfo-${item.id}`][index];
          // 存储校验方法
          this.validationMethodsList.push(PassengerInfo.formValidation);
          this.fromDataMap[item.id] = PassengerInfo.fromData;
        });
      });
    },
    async onSubmit(result) {
      this.handlePassengerInfo();
      if (!this.validationMethodsList?.length) return;
      for (const index in this.validationMethodsList) {
        try {
          const validation = await this.validationMethodsList[index]();
          if (!validation) throw new Error(validation);
        } catch (error) {
          console.error(error);
          return error;
        }
      }
      console.log(this.fromDataMap);
      if (result) {
        this.$message.success("有票");
      } else {
        this.$message.error("无票");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  background-color: #f7f8fa;
  padding: 10px;

  &-title {
    font-size: 13px;
    font-weight: 600;
    color: $main-font-color;
    line-height: 20px;
    padding: 0 0 5px;
  }
  .content {
    padding: 16px 20px;
    background-color: #fff;
    .item-title {
      height: 32px;
      font-size: 18px;
      font-weight: 400;
      color: $main-font-color;
      line-height: 32px;
    }
  }
  .ticketing-item {
    margin: 0 0 12px;
  }
  .ticketing-item-content {
    border: 1px solid #eee;
    margin: 5px 0 0;
  }
  .content-info {
    padding: 24px;
    background-color: #fff;
    .remark {
      padding: 9px 12px;
      line-height: 22px;
      font-size: 16px;
      font-weight: 700;
      color: $--color-danger;
      background-color: #ff49491a;
    }
    .info {
      display: flex;
      align-items: baseline;
      padding: 10px 0 0;
    }
    .credential-type {
      min-width: fit-content;
      font-size: 16px;
      font-weight: 400;
      color: $sub-font-color;
      margin-top: 15px;
    }
  }
}
</style>
