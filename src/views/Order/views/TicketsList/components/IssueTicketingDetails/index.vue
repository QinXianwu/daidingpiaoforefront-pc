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
        <span class="item-title">{{ ticketing.title }}</span>
        <div class="ticketing-item-content">
          <!-- 出票头部信息 读 -->
          <HeadView />
          <div class="content-info">
            <div class="remark">
              <span>可接受席位：必须03车，最好F座，不接受</span>
            </div>
            <div class="info">
              <div class="credential-type">
                <span>1.DE 二代</span>
              </div>
              <div class="info-content">
                <div class="info-item">
                  <div class="info-item-main">
                    <CopyButton copyString="张三" v-if="'张三'">
                      <span>张三</span>
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
                    <CopyButton copyString="360121 1995 0504 052" v-if="'张三'">
                      <span>360121 1995 0504 052</span>
                      <span class="copy">复制</span>
                    </CopyButton>
                  </div>
                  <div class="info-footer">
                    <span class="label mr-10">成人票</span>
                    <div class="value">
                      <el-radio-group
                        class="info-radiogroup"
                        v-model="seatClass"
                      >
                        <el-radio
                          :key="index"
                          :label="item.value"
                          class="info-radiogroup-item"
                          v-for="(item, index) in seatClassOptions"
                          >{{ item.label }}</el-radio
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
      <FooterView :mobilePhone="'150 7909 3005'" @onSubmit="onSubmit" />
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
  data() {
    return {
      info: {
        carCompartment: "",
        seatNum: "",
        amount: "",
      },
      issueTicketingName: "",
      seatClass: 2,
      ticketingList: [{ title: "去程" }, { title: "联程" }],
      seatClassOptions: [
        {
          label: "一等座",
          value: 1,
        },
        {
          label: "二等座",
          value: 2,
        },
        {
          label: "卧代二等座",
          value: 3,
        },
      ],
    };
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
      font-size: 16px;
      font-weight: 700;
      color: $--color-danger;
      background-color: #ff49491a;
    }
    .info {
      display: flex;
      align-items: baseline;
      padding: 30px 0 0;
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
  margin-left: 40px;

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
