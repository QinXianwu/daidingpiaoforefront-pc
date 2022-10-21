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
              <div class="info-content">
                <div class="info-item">
                  <div class="info-item-main">
                    <CopyButton :copyString="item.passengerName || '-'">
                      <span>{{ item.passengerName || "-" }}</span>
                      <span class="copy">复制</span>
                    </CopyButton>
                  </div>
                  <div class="info-footer">
                    <span class="label mr-10">出票姓名</span>
                    <div class="value">
                      <el-input
                        class="name-input"
                        v-model="issueTicketingName"
                        placeholder="请输入出票姓名"
                      />
                      <span class="form-tip"
                        >（同音不同字时填写票机展示姓名）</span
                      >
                    </div>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-item-main">
                    <CopyButton :copyString="item.passportNumber">
                      <span>{{ item.passportNumber || "-" }}</span>
                      <span class="copy">复制</span>
                    </CopyButton>
                  </div>
                  <div class="info-footer">
                    <span class="label mr-10">{{
                      $CONST.PASSENGER_TYPE_TEXT[item.passengerType]
                    }}</span>
                    <div class="value">
                      <el-radio-group
                        class="info-radiogroup"
                        v-model="seatClass"
                      >
                        <el-radio
                          :key="i"
                          :label="ele.value"
                          class="info-radiogroup-item"
                          v-for="(ele, i) in getSeatClassOptions(
                            ticketing.acceptSeatName
                          )"
                          >{{ ele.label }}</el-radio
                        >
                      </el-radio-group>
                    </div>
                  </div>
                </div>
                <div class="info-item">
                  <div class="info-item-main">
                    <div></div>
                  </div>
                  <div class="info-footer">
                    <div
                      class="otherData"
                      v-for="(item, index) in otherData"
                      :key="index"
                    >
                      <div class="value">
                        <el-input
                          class="min-input"
                          v-model="info[item.prop]"
                          :disabled="item.disabled"
                          @input="(e) => item.callback(e, item.prop)"
                          placeholder="请输入"
                        />
                      </div>
                      <span
                        class="label ml-10 mr-10"
                        :class="{ 'amount-label': item.prop === 'amount' }"
                        >{{ item.label }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterView :mobilePhone="'13579093005'" @onSubmit="onSubmit" />
    </div>
  </div>
</template>

<script>
import HeadView from "./Head.vue";
import FooterView from "./Footer.vue";
import CopyButton from "@/components/CopyButton/index";

export default {
  name: "IssueTicketingDetails",
  components: { HeadView, CopyButton, FooterView },
  props: {
    ticketingList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      info: {
        carCompartment: "",
        seatNum: "",
        amount: "",
      },
      issueTicketingName: "",
      seatClass: 2,
    };
  },
  created() {
    console.log("出票详情");
  },
  computed: {
    otherData({ info }) {
      return [
        {
          prop: "carCompartment",
          label: "车厢",
        },
        {
          prop: "seatNum",
          label: "座号",
        },
        {
          prop: "amount",
          label: info?.amount || 0,
          callback: this.inputAmount,
        },
      ];
    },
  },
  methods: {
    // 获取
    getSeatClassOptions(arrJson) {
      const arr = typeof arrJson === "string" ? JSON.parse(arrJson) : [];
      return arr.map((item, index) => ({
        label: item,
        value: index,
      }));
    },
    onSubmit(res) {
      if (res) {
        this.$message.success("有票");
      } else {
        this.$message.error("无票");
      }
    },
    inputAmount(value, key) {
      this.$nextTick(() => {
        this.info[key] = value;
      });
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
.info-content {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}
.info-item {
  margin-left: 35px;

  &-main {
    padding: 0 0 30px;
    span {
      font-size: 22px;
      font-weight: 500;
      color: $main-font-color;
    }
  }
  .copy {
    font-size: 12px;
    font-weight: 400;
    color: #666666;
    margin: 0 10px;
    padding: 2px 10px;
    background: #eee;
  }
}
.info-footer {
  display: flex;
  align-items: baseline;
  padding: 0 5px;
  .otherData {
    display: flex;
    align-items: baseline;
  }
  .label {
    font-size: 14px;
    font-weight: 400;
    color: $sub-font-color;
  }
  .label.amount-label {
    display: flex;
    padding: 4px 8px;
    background-color: $--color-danger;
    font-weight: 700;
    color: #ffffff;
    border-radius: 20px;
    &::after {
      content: "元";
      display: block;
    }
  }
  .value {
    display: flex;
    flex-direction: column;
  }
  .info-radiogroup {
    max-width: 250px;
    &-item {
      margin: 0 10px 10px;
    }
  }
}
.name-input {
  width: 150px;
}
.min-input {
  width: 100px;
}
</style>
